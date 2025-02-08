import { SignInDto } from '../dto/auth/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { SignUpDto } from '../dto/auth/sign-up.dto';
import { Injectable } from '@nestjs/common';
import {
  checkPassword,
  excludeFields,
  getSalt,
  getVerifyCode,
  hashedPasswordFunc,
} from '../helper';
import { ResponseStandard } from 'src/classes';
import { ErrorCode } from 'src/enum';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
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

  async signIn(signInDto: SignInDto) {
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
    // todo with jwt
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      'Sign in successfully',
      user.uuid,
    );
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.prismaService.user.findUnique({ where: { email } });

  //   if (user && user.password === password) {
  //     const payload = { sub: user.id, vendorUuid: user.vendorUuid }; // Thêm vendorUuid vào token
  //     return { access_token: this.jwtService.sign(payload) };
  //   }

  //   return null;
  // }
}
