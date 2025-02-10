import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  checkPassword,
  excludeFields,
  getSalt,
  getVerifyCode,
  hashedPasswordFunc,
} from '../../helper';
import { ResponseStandard } from '../../classes';
import { ErrorCode } from '../../enum';
import * as jwt from 'jsonwebtoken';
import { SignInDto, SignUpDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<ResponseStandard<SignUpResponseDto>> {
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
          isVendor: false,
          subsType: 'BASIC',
        },
      });

      return new ResponseStandard(
        false,
        ErrorCode.NONE,
        'User was created successfully',
        excludeFields(user, [
          'hashedPassword',
          'isDeleted',
          'isVerified',
          'salt',
          'isVendor',
          'vendorUuid',
        ]),
      );
    }

    return new ResponseStandard(
      true,
      ErrorCode.EMAIL_PASSWORD_EXISTED,
      'Email or Password is not correct',
      null,
    );
  }

  async signIn(signInDto: SignInDto): Promise<ResponseStandard<SignInResponseDto>> {
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

    const accessToken = jwt.sign({ id: user.id }, 'access_secret', {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ id: user.id }, 'refresh_secret', {
      expiresIn: '7d',
    });

    // todo with jwt
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      'Sign in successfully',``
      user.uuid,
    );
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.prismaService.user.findUnique({ where: { email } });

  //   if (user && user.password === password) {
  //     const payload = { sub: user.id, vendorUuid: user.vendorUuid }; // add vendorUuid vào token
  //     return { access_token: this.jwtService.sign(payload) };
  //   }

  //   return null;
  // }
}
