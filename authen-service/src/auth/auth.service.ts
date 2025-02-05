import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(signUpDto: SignUpDto) {
    // await

    return 'a';
  }
}
