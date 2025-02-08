import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from '../dto';
import { ResponseStandard } from '../classes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ResponseStandard> {
    const result = await this.authService.signUp(signUpDto);
    const { hasError, message } = result;
    if (hasError) throw new BadRequestException(message);
    return result;
  }

  @Get('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<ResponseStandard> {
    const result = await this.authService.signIn(signInDto);
    const { hasError, message } = result;
    if (hasError) throw new BadRequestException(message);
    return result;
  }
}
