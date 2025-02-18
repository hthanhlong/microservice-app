import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AxiosService } from '../axios/axios.service';
import {
  SignUpDto,
  SignInDto,
  SignInWithGoogleDto,
  VerifyCodeDto,
  SignUpVendorDto,
} from './dto/request';
import {
  SignUpResponseDto,
  SignInResponseDto,
  VerifyCodeResponseDto,
  SignUpVendorResponseDto,
} from './dto/response';
import { IRes } from '../../classes';
@Injectable()
export class AuthService {
  constructor(
    private readonly axiosService: AxiosService,
    @Inject('AUTH_ROUTES')
    private readonly authRoutesMap: Record<string, string>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<IRes<SignUpResponseDto>> {
    return this.axiosService.post(this.authRoutesMap.signUp, signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<IRes<SignInResponseDto>> {
    return this.axiosService.post(this.authRoutesMap.signIn, signInDto);
  }

  async googleSignIn(
    googleSignInDto: SignInWithGoogleDto,
  ): Promise<IRes<SignInResponseDto>> {
    return this.axiosService.post(
      this.authRoutesMap.googleSignIn,
      googleSignInDto,
    );
  }

  async refreshTokens(refreshToken: string): Promise<IRes<SignInResponseDto>> {
    return this.axiosService.post(this.authRoutesMap.refreshTokens, {
      refreshToken,
    });
  }

  async signUpVendor(
    signUpVendorDto: SignUpVendorDto,
  ): Promise<IRes<SignUpVendorResponseDto>> {
    return this.axiosService.post(
      this.authRoutesMap.signUpVendor,
      signUpVendorDto,
    );
  }

  async verifyCode(
    verifyCodeDto: VerifyCodeDto,
  ): Promise<IRes<VerifyCodeResponseDto>> {
    return this.axiosService.post(this.authRoutesMap.verifyCode, verifyCodeDto);
  }

  setCookies(
    res: Response,
    data: { accessToken: string; refreshToken: string },
  ) {
    res.cookie('access_token', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.cookie('refresh_token', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });
  }
}
