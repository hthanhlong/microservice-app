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
import { AxiosService } from '../axios/axios.service';
import { ResponseStandard } from '../../classes';
import {
  SignUpResponseDto,
  SignInResponseDto,
  SignUpVendorResponseDto,
  VerifyCodeResponseDto,
} from './dto/response';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { ENDPOINTS, AUTH_PREFIX } from './routes';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
@Controller(AUTH_PREFIX)
export class AuthController {
  private readonly authServiceUrl = process.env.AUTHENTICATION_SERVICE_URL;

  private authRoutesMap = {
    signUp: `${this.authServiceUrl}/${AUTH_PREFIX}/${ENDPOINTS.signUp}`,
    signIn: `${this.authServiceUrl}/${AUTH_PREFIX}/${ENDPOINTS.signIn}`,
    googleSignIn: `${this.authServiceUrl}/${AUTH_PREFIX}/${ENDPOINTS.googleSignIn}`,
    refreshTokens: `${this.authServiceUrl}/${AUTH_PREFIX}/${ENDPOINTS.refreshTokens}`,
    signUpVendor: `${this.authServiceUrl}/${AUTH_PREFIX}/${ENDPOINTS.signUpVendor}`,
    verifyCode: `${this.authServiceUrl}/${AUTH_PREFIX}/${ENDPOINTS.verifyCode}`,
  };

  constructor(
    private readonly axiosService: AxiosService,
    private readonly authService: AuthService,
  ) {}

  @Post(ENDPOINTS.signUp)
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

  @Get(ENDPOINTS.signIn)
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

  @Post(ENDPOINTS.googleSignIn)
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

  @Post(ENDPOINTS.refreshTokens)
  async refreshTokens(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const refreshToken = req.cookies?.refresh_token as string;
    if (!refreshToken)
      throw new BadRequestException('Refresh token is required');
    const result = await this.axiosService.post<
      ResponseStandard<SignInResponseDto>
    >(this.authRoutesMap.refreshTokens, { refreshToken });
    const { hasError, message } = result;
    if (hasError || !result.data) throw new BadRequestException(message);
    this.authService.setCookies(res, result.data);
    return result;
  }

  @Post(ENDPOINTS.signUpVendor)
  @UseGuards(JwtAuthGuard)
  async signUpVendor(
    @Body() signUpVendorDto: SignUpVendorDto,
  ): Promise<ResponseStandard<SignUpVendorResponseDto>> {
    const result = await this.axiosService.post<
      ResponseStandard<SignUpVendorResponseDto>
    >(this.authRoutesMap.signUpVendor, signUpVendorDto);
    return result;
  }

  @Post(ENDPOINTS.verifyCode)
  async verifyCode(
    @Body() verifyCodeDto: VerifyCodeDto,
  ): Promise<ResponseStandard<VerifyCodeResponseDto>> {
    const result = await this.axiosService.post<
      ResponseStandard<VerifyCodeResponseDto>
    >(this.authRoutesMap.verifyCode, verifyCodeDto);
    const { hasError, message } = result;
    if (hasError || !result.data) throw new BadRequestException(message);
    return result;
  }
}
