import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() signUpDto: SignUpDto) {
    try {
      const result = await this.authService.register(signUpDto);
      const { hasError, message } = result;
      if (hasError) {
        throw new BadRequestException(message);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException('some thing wrong', HttpStatus.BAD_GATEWAY);
    }
  }
}
