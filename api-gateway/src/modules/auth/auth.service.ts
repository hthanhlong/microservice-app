import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly axiosService: AxiosService) {}

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
