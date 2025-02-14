import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorResponse, ResponseStandard } from '../../classes';
import {
  SignInDto,
  SignInWithGoogleDto,
  SignUpDto,
  SignUpVendorDto,
} from './dto/request';
import {
  SignInResponseDto,
  SignUpResponseDto,
  SignUpVendorResponseDto,
} from './dto/response';
import { Request } from 'express';
import { ErrorCode, ErrorMessage } from '../../enum';
import { AUTH_PREFIX, ENDPOINTS } from './routes';
@Controller(AUTH_PREFIX)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ENDPOINTS.signUp)
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ResponseStandard<SignUpResponseDto | null>> {
    const result = await this.authService.signUp(signUpDto);
    if (result instanceof ErrorResponse) {
      return new ResponseStandard(
        true,
        result.errorCode,
        ErrorMessage.SIGN_UP_FAILED,
        null,
      );
    }
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      ErrorMessage.SIGN_UP_SUCCESS,
      result,
    );
  }

  @Get(ENDPOINTS.signIn)
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const result = await this.authService.signIn(signInDto);
    if (result instanceof ErrorResponse) {
      return new ResponseStandard(
        true,
        result.errorCode,
        ErrorMessage.SIGN_IN_FAILED,
        null,
      );
    }
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      ErrorMessage.SIGN_IN_SUCCESS,
      result,
    );
  }

  @Post(ENDPOINTS.refreshTokens)
  async refreshTokens(
    @Req() req: Request,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const refreshToken = req.cookies?.refresh_token as string;

    if (!refreshToken) {
      return new ResponseStandard(
        true,
        ErrorCode.REFRESH_TOKEN_REQUIRED,
        ErrorMessage.REFRESH_TOKEN_REQUIRED,
        null,
      );
    }
    const tokens = await this.authService.refreshTokens(refreshToken);

    if (tokens instanceof ErrorResponse) {
      return new ResponseStandard(
        true,
        tokens.errorCode,
        ErrorMessage.TOKEN_REFRESH_FAILED,
        null,
      );
    }

    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      ErrorMessage.TOKEN_REFRESHED,
      tokens,
    );
  }

  @Post(ENDPOINTS.googleSignIn)
  async googleSignIn(
    @Body() signInWithGoogleDto: SignInWithGoogleDto,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const result = await this.authService.googleSignIn(
      signInWithGoogleDto.idToken,
    );

    if (result instanceof ErrorResponse) {
      return new ResponseStandard(
        true,
        result.errorCode,
        ErrorMessage.GOOGLE_SIGN_IN_FAILED,
        null,
      );
    }
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      ErrorMessage.GOOGLE_SIGN_IN_SUCCESS,
      result,
    );
  }

  @Post(ENDPOINTS.logout)
  async logout(@Req() req: Request) {
    const refreshToken = req.cookies?.refresh_token as string;
    if (!refreshToken) {
      return new ResponseStandard(
        true,
        ErrorCode.REFRESH_TOKEN_REQUIRED,
        ErrorMessage.REFRESH_TOKEN_REQUIRED,
        null,
      );
    }
    await this.authService.logout(refreshToken);
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      ErrorMessage.LOGOUT_SUCCESS,
      null,
    );
  }

  @Post(ENDPOINTS.signUpVendor)
  async signUpVendor(
    @Body() signUpVendorDto: SignUpVendorDto,
  ): Promise<ResponseStandard<SignUpVendorResponseDto | null>> {
    const result = await this.authService.signUpVendor(signUpVendorDto);
    if (result instanceof ErrorResponse) {
      return new ResponseStandard(
        true,
        result.errorCode,
        ErrorMessage.SIGN_UP_VENDOR_FAILED,
        null,
      );
    }
    return new ResponseStandard(
      false,
      ErrorCode.NONE,
      ErrorMessage.SIGN_UP_VENDOR_SUCCESS,
      result,
    );
  }
}
