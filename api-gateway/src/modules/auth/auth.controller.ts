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
import { IRes } from '../../classes';
import {
  SignUpResponseDto,
  SignInResponseDto,
  SignUpVendorResponseDto,
  VerifyCodeResponseDto,
} from './dto/response';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { ENDPOINTS } from './routes';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ENDPOINTS.v1.signUp)
  async signUp(@Body() signUpDto: SignUpDto): Promise<IRes<SignUpResponseDto>> {
    const result = await this.authService.signUp(signUpDto);
    if (result.hasError || !result.data)
      throw new BadRequestException(result.message);
    return result;
  }

  @Get(ENDPOINTS.v1.signIn)
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

  @Post(ENDPOINTS.v1.googleSignIn)
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

  @Post(ENDPOINTS.v1.refreshTokens)
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

  @Post(ENDPOINTS.v1.signUpVendor)
  @UseGuards(JwtAuthGuard)
  async signUpVendor(
    @Body() signUpVendorDto: SignUpVendorDto,
  ): Promise<IRes<SignUpVendorResponseDto>> {
    const result = await this.authService.signUpVendor(signUpVendorDto);
    return result;
  }

  @Post(ENDPOINTS.v1.verifyCode)
  @UseGuards(JwtAuthGuard)
  async verifyCode(
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<IRes<VerifyCodeResponseDto>> {
    const result = await this.authService.verifyCode(verifyCodeDto);
    return result;
  }
}
