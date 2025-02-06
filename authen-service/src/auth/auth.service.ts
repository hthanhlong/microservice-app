import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Injectable } from '@nestjs/common';
import {
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
    private UserService: UserService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async register(signUpDto: SignUpDto) {
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
          isVerified: false,
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
          'id',
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
}
