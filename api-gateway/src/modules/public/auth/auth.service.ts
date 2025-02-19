import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AxiosService } from '../../internal/axios/axios.service';
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
import { IRes } from '../../../classes';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<IRes<SignUpResponseDto>> {
    const endpoint = this.configService.get<string>('auth.v1.signUp');
    if (!endpoint) {
      throw new Error('Auth signup endpoint not configured');
    }
    return this.axiosService.post(endpoint, signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<IRes<SignInResponseDto>> {
    const endpoint = this.configService.get<string>('auth.v1.signIn');
    if (!endpoint) {
      throw new Error('Auth signin endpoint not configured');
    }
    return this.axiosService.post(endpoint, signInDto);
  }

  async googleSignIn(
    googleSignInDto: SignInWithGoogleDto,
  ): Promise<IRes<SignInResponseDto>> {
    const endpoint = this.configService.get<string>('auth.v1.googleSignIn');
    if (!endpoint) {
      throw new Error('Auth Google sign in endpoint not configured');
    }
    return this.axiosService.post(endpoint, googleSignInDto);
  }

  async refreshTokens(refreshToken: string): Promise<IRes<SignInResponseDto>> {
    const endpoint = this.configService.get<string>('auth.v1.refreshTokens');
    if (!endpoint) {
      throw new Error('Auth refresh tokens endpoint not configured');
    }
    return this.axiosService.post(endpoint, {
      refreshToken,
    });
  }

  async signUpVendor(
    signUpVendorDto: SignUpVendorDto,
  ): Promise<IRes<SignUpVendorResponseDto>> {
    const endpoint = this.configService.get<string>('auth.v1.signUpVendor');
    if (!endpoint) {
      throw new Error('Auth vendor signup endpoint not configured');
    }
    return this.axiosService.post(endpoint, signUpVendorDto);
  }

  async verifyCode(
    verifyCodeDto: VerifyCodeDto,
  ): Promise<IRes<VerifyCodeResponseDto>> {
    const endpoint = this.configService.get<string>('auth.v1.verifyCode');
    if (!endpoint) {
      throw new Error('Auth verify code endpoint not configured');
    }
    return this.axiosService.post(endpoint, verifyCodeDto);
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
