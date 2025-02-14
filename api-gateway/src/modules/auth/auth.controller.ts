import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { SignUpDto, SignInDto, SignInWithGoogleDto } from './dto/request';
import { AxiosService } from '../axios/axios.service';
import { ResponseStandard } from '../../classes';
import { SignUpResponseDto, SignInResponseDto } from './dto/response';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly authServiceUrl = process.env.AUTHENTICATION_SERVICE_URL;

  private authRoutesMap = {
    signUp: `${this.authServiceUrl}/auth/sign-up`,
    signIn: `${this.authServiceUrl}/auth/sign-in`,
    googleSignIn: `${this.authServiceUrl}/auth/google/sign-in`,
  };

  constructor(
    private readonly axiosService: AxiosService,
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ResponseStandard<SignUpResponseDto>> {
    const result = await this.axiosService.post<
      ResponseStandard<SignUpResponseDto>
    >(this.authRoutesMap.signUp, signUpDto);

    const { hasError, message } = result;
    if (hasError || !result.data) throw new BadRequestException(message);

    return result;
  }

  @Get('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const result = await this.axiosService.post<
      ResponseStandard<SignInResponseDto>
    >(this.authRoutesMap.signIn, signInDto);

    const { hasError, message } = result;
    if (hasError || !result.data) throw new BadRequestException(message);
    this.authService.setCookies(res, result.data);
    return result;
  }

  @Post('google/sign-in')
  async googleSignIn(
    @Body() signInWithGoogleDto: SignInWithGoogleDto,
    @Res() res: Response,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const result = await this.axiosService.post<
      ResponseStandard<SignInResponseDto>
    >(this.authRoutesMap.googleSignIn, signInWithGoogleDto);

    const { hasError, message } = result;
    if (hasError || !result.data) throw new BadRequestException(message);
    this.authService.setCookies(res, result.data);
    return result;
  }
}
