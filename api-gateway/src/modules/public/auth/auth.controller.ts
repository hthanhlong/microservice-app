import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  SignUpDto,
  SignInDto,
  SignInWithGoogleDto,
  SignUpVendorDto,
  VerifyCodeDto,
} from './dto/request';
import { IRes } from '../../../classes';
import {
  SignUpResponseDto,
  SignInResponseDto,
  SignUpVendorResponseDto,
  VerifyCodeResponseDto,
} from './dto/response';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

const AUTH_ROUTES = {
  signUp: 'sign-up',
  signIn: 'sign-in',
  googleSignIn: 'google/sign-in',
  refreshTokens: 'refresh-tokens',
  signUpVendor: 'vendor/sign-up',
  verifyCode: 'verify-code',
};

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.signUp)
  async signUp(@Body() signUpDto: SignUpDto): Promise<IRes<SignUpResponseDto>> {
    const result = await this.authService.signUp(signUpDto);
    if (result.hasError || !result.data)
      throw new BadRequestException(result.message);
    return result;
  }

  @Post(AUTH_ROUTES.signIn)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<IRes<SignInResponseDto | null>> {
    const result = await this.authService.signIn(signInDto);
    if (result.hasError || !result.data)
      throw new BadRequestException(result.message);
    this.authService.setCookies(res, result.data);
    return result;
  }

  @Post(AUTH_ROUTES.googleSignIn)
  async googleSignIn(
    @Body() signInWithGoogleDto: SignInWithGoogleDto,
    @Res() res: Response,
  ): Promise<IRes<SignInResponseDto | null>> {
    const result = await this.authService.googleSignIn(signInWithGoogleDto);
    if (result.hasError || !result.data)
      throw new BadRequestException(result.message);
    this.authService.setCookies(res, result.data);
    return result;
  }

  @Post(AUTH_ROUTES.refreshTokens)
  async refreshTokens(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<IRes<SignInResponseDto | null>> {
    const refreshToken = req.cookies?.refresh_token as string;
    if (!refreshToken)
      throw new BadRequestException('Refresh token is required');
    const result = await this.authService.refreshTokens(refreshToken);
    if (result.hasError || !result.data)
      throw new BadRequestException(result.message);
    this.authService.setCookies(res, result.data);
    return result;
  }

  @Post(AUTH_ROUTES.signUpVendor)
  @UseGuards(JwtAuthGuard)
  async signUpVendor(
    @Body() signUpVendorDto: SignUpVendorDto,
  ): Promise<IRes<SignUpVendorResponseDto>> {
    const result = await this.authService.signUpVendor(signUpVendorDto);
    return result;
  }

  @Post(AUTH_ROUTES.verifyCode)
  @UseGuards(JwtAuthGuard)
  async verifyCode(
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<IRes<VerifyCodeResponseDto>> {
    const result = await this.authService.verifyCode(verifyCodeDto);
    return result;
  }
}
