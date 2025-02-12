import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  checkPassword,
  getSalt,
  getVerifyCode,
  hashedPasswordFunc,
  mapResponseToDto,
} from '../../helper';
import { ResponseStandard } from '../../classes';
import { ErrorCode } from '../../enum';
import * as jwt from 'jsonwebtoken';
import { SignInDto, SignUpDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';
import { RedisService } from '../redis/redis.service';
import axios from 'axios';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private redisService: RedisService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<ResponseStandard<SignUpResponseDto | null>> {
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
          isVerified: false, // fix later
        },
      });

      // map DTO
      const response = mapResponseToDto(user, SignUpResponseDto);

      return new ResponseStandard(
        false,
        ErrorCode.NONE,
        'User was created successfully',
        response,
      );
    }
    // existed email
    return new ResponseStandard(
      true,
      ErrorCode.EMAIL_PASSWORD_EXISTED,
      'Email or Password is not correct',
      null,
    );
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const { email, password } = signInDto;
    // init
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    // check email
    if (!user) {
      return new ResponseStandard(
        true,
        ErrorCode.EMAIL_PASSWORD_EXISTED,
        'Email or Password is not correct',
        null,
      );
    }
    // check password
    const isCorrectPassword = await checkPassword(
      password,
      user.hashedPassword,
      user.salt,
    );

    if (!isCorrectPassword) {
      return new ResponseStandard(
        true,
        ErrorCode.EMAIL_PASSWORD_EXISTED,
        'Email or Password is not correct',
        null,
      );
    }

    const tokens = await this.generateTokens(user.uuid);
    await this.storeRefreshToken(tokens.refreshToken, user.uuid);
    const response = mapResponseToDto(tokens, SignInResponseDto);
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      'Sign in successfully',
      response,
    );
  }

  verifyRefreshToken(refreshToken: string): {
    userUuid: string;
    email: string;
    vendorUuid: string;
  } {
    const decoded = jwt.verify(refreshToken, 'refresh_secret') as {
      userUuid: string;
      email: string;
      vendorUuid: string;
    };
    return decoded;
  }

  async storeRefreshToken(refreshToken: string, userUuid: string) {
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

  async generateTokens(userUuid: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });

    if (!user) throw new BadRequestException();

    const accessToken = jwt.sign(
      {
        uuid: userUuid,
        email: user.email,
        vendorUuid: user.vendorUuid,
      },
      'access_secret', // TODO: change to env
      {
        expiresIn: '15m', // TODO: change to env
      },
    );

    const refreshToken = jwt.sign(
      {
        uuid: userUuid,
        email: user.email,
        vendorUuid: user.vendorUuid,
      },
      'refresh_secret', // TODO: change to env
      {
        expiresIn: '7d', // TODO: change to env
      },
    );

    return { accessToken, refreshToken };
  }

  async verifyGoogleIdToken(idToken: string): Promise<{
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

  async googleSignIn(
    idToken: string,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const { email, name } = await this.verifyGoogleIdToken(idToken);

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

    const tokens = await this.generateTokens(user.uuid);
    await this.storeRefreshToken(tokens.refreshToken, user.uuid);
    const response = mapResponseToDto(tokens, SignInResponseDto);
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      'Sign in successfully',
      response,
    );
  }
}
