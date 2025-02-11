import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  checkPassword,
  getSalt,
  getVerifyCode,
  hashedPasswordFunc,
} from '../../helper';
import { ResponseStandard } from '../../classes';
import { ErrorCode } from '../../enum';
import * as jwt from 'jsonwebtoken';
import { SignInDto, SignUpDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { RedisService } from '../redis/redis.service';
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
      const response = plainToInstance(SignUpResponseDto, user, {
        excludeExtraneousValues: true,
      });

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

    if (!tokens) {
      return new ResponseStandard(
        true,
        ErrorCode.INTERNAL_SERVER_ERROR,
        'Internal server error',
        null,
      );
    }

    await this.storeRefreshToken(tokens.refreshToken, user.uuid);

    // map DTO
    const response = plainToInstance(
      SignInResponseDto,
      {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      {
        excludeExtraneousValues: true,
      },
    );

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
  } | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });

    if (!user) return null;

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
}
