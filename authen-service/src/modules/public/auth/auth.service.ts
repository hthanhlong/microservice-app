import { PrismaService } from '../../internal/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  checkPassword,
  getSalt,
  getVerifyCode,
  hashedPasswordFunc,
  mapResponseToDto,
} from '../../../helper';
import { IErrorRes, IRes } from '../../../common/classes';
import { ErrorCode, ErrorMessage } from '../../../common/enum';
import {
  SignUpVendorDto,
  SignInDto,
  SignUpDto,
  VerifyCodeDto,
} from './dto/request';
import {
  SignInResponseDto,
  SignUpResponseDto,
  SignUpVendorResponseDto,
} from './dto/response';
import { RedisService } from '../../internal/redis/redis.service';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { KafkaService } from '../../internal/kafka/kafka.service';
import { KeyService } from '../../internal/key/keys.service';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private redisService: RedisService,
    private jwtService: JwtService,
    private kafkaService: KafkaService,
    private keyService: KeyService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto | IErrorRes> {
    const { name, email, password } = signUpDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      const salt = await getSalt();
      const hashedPassword = await hashedPasswordFunc(password, salt);
      const verifyCode = getVerifyCode();

      const user = await this.prismaService.user.create({
        data: {
          email: email,
          name: name,
          hashedPassword: hashedPassword,
          verifyCode: verifyCode,
          salt: salt,
          subsType: 'BASIC',
        },
      });

      // using kafka to send verify code email
      this.kafkaService.sendVerifyCode({
        email,
        verifyCode,
      });

      // map DTO
      const userDto = mapResponseToDto(user, SignUpResponseDto);
      return userDto;
    }
    // existed email
    return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto | IErrorRes> {
    const { email, password } = signInDto;
    // init
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    // check email
    if (!user) {
      return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
    }
    // check password
    const isCorrectPassword = await checkPassword(
      password,
      user.hashedPassword,
      user.salt,
    );

    if (!isCorrectPassword) {
      return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
    }

    const tokens = await this._generateTokens(user.uuid);
    if (tokens instanceof IErrorRes) {
      return tokens;
    }
    await this._storeRefreshToken(tokens.refreshToken, user.uuid);
    const response = mapResponseToDto(tokens, SignInResponseDto);
    return response;
  }

  async _verifyRefreshToken(refreshToken: string) {
    const userUuid = await this.redisService.get(refreshToken);
    if (!userUuid) {
      return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
    }
    return userUuid;
  }

  async refreshTokens(refreshToken: string) {
    const userUuid = await this._verifyRefreshToken(refreshToken);
    if (!userUuid) {
      return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
    }
    const tokens = await this._generateTokens(userUuid as string);
    if (tokens instanceof IErrorRes) {
      return tokens;
    }
    await this._storeRefreshToken(tokens.refreshToken, userUuid as string);
    return tokens;
  }

  async _storeRefreshToken(refreshToken: string, userUuid: string) {
    // todo build log
    const hasRefreshToken = await this.redisService.get(userUuid);
    if (hasRefreshToken) {
      await this.redisService.del(userUuid);
    }
    const TIME_EXPIRE_REFRESH_TOKEN = 60 * 60 * 24 * 7; // 7 days
    await this.redisService.set(
      userUuid,
      refreshToken,
      TIME_EXPIRE_REFRESH_TOKEN,
    );
  }

  async _generateTokens(userUuid: string): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | IErrorRes
  > {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });

    if (!user) return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);

    const accessToken = await this.jwtService.signAsync(
      {
        uuid: userUuid,
        email: user.email,
      },
      {
        privateKey: await this.keyService.getPrivateKey(),
        algorithm: 'RS256',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        uuid: userUuid,
        email: user.email,
      },
      {
        privateKey: await this.keyService.getPrivateKey(),
        algorithm: 'RS256',
      },
    );

    return { accessToken, refreshToken };
  }

  async _verifyGoogleIdToken(idToken: string): Promise<{
    email: string;
    name: string;
  }> {
    const { data } = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
    );

    return data as {
      email: string;
      name: string;
    };
  }

  async googleSignIn(idToken: string): Promise<SignInResponseDto | IErrorRes> {
    const { email, name } = await this._verifyGoogleIdToken(idToken);

    let user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    // if user not found, create new user
    if (!user) {
      const salt = await getSalt();
      const randomPassword = Math.random().toString(36).substring(2, 15);
      const hashedPassword = await hashedPasswordFunc(randomPassword, salt);
      const verifyCode = getVerifyCode();
      user = await this.prismaService.user.create({
        data: {
          email: email,
          name: name,
          isVerified: true,
          hashedPassword: hashedPassword,
          salt: salt,
          verifyCode: verifyCode,
          subsType: 'BASIC',
          isDeleted: false,
        },
      });
    }

    const tokens = await this._generateTokens(user.uuid);
    if (tokens instanceof IErrorRes) {
      return tokens;
    }
    await this._storeRefreshToken(tokens.refreshToken, user.uuid);
    const response = mapResponseToDto(tokens, SignInResponseDto);
    return response;
  }

  async logout(refreshToken: string) {
    await this.redisService.del(refreshToken);
  }

  async signUpVendor(signUpVendorDto: SignUpVendorDto) {
    const { userUuid, businessName, businessAddress, businessLicense } =
      signUpVendorDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });

    if (!user) {
      return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
    }

    const vendor = await this.prismaService.vendor.create({
      data: {
        userUuId: userUuid,
        businessName: businessName,
        businessAddress: businessAddress,
        businessLicense: businessLicense,
      },
    });

    return mapResponseToDto(vendor, SignUpVendorResponseDto);
  }

  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    const { email, code } = verifyCodeDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
    }

    if (user.verifyCode !== code) {
      return new IErrorRes(ErrorCode.EMAIL_PASSWORD_EXISTED);
    }

    await this.prismaService.user.update({
      where: {
        email: email,
      },
      data: {
        isVerified: true,
      },
    });

    return new IRes(
      false,
      ErrorCode.NONE,
      ErrorMessage.VERIFY_CODE_SUCCESS,
      null,
    );
  }
}
