import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseStandard } from '../../classes';
import { SignInDto, SignInWithGoogleDto, SignUpDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ResponseStandard<SignUpResponseDto | null>> {
    const result = await this.authService.signUp(signUpDto);
    const { hasError, message } = result;
    if (hasError) throw new BadRequestException(message);
    return result;
  }

  @Get('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const result = await this.authService.signIn(signInDto);
    const { hasError, message } = result;
    if (hasError || !result.data) throw new BadRequestException(message);

    const { accessToken, refreshToken } = result.data;

    // set cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return result;
  }

  // @Post('refresh')
  // async refreshTokens(@Req() req: Request, @Res() res: Response) {
  //   const _refreshToken = req.cookies?.refresh_token;

  //   if (!_refreshToken) {
  //     throw new UnauthorizedException('Refresh token is required');
  //   }

  //   const { userUuid } = this.authService.verifyRefreshToken(
  //     _refreshToken as string,
  //   );

  //   if (!userUuid) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }

  //   const tokens = await this.authService.generateTokens(userUuid);

  //   await this.authService.storeRefreshToken(userUuid, tokens.refreshToken);

  //   res.cookie('access_token', tokens.accessToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'strict',
  //   });
  //   res.cookie('refresh_token', tokens.refreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'strict',
  //     path: '/auth/refresh',
  //   });

  //   return res.json({ message: 'Token refreshed' });
  // }

  @Post('google/sign-in')
  async googleSignIn(
    @Body() signInWithGoogleDto: SignInWithGoogleDto,
    @Res() res: Response,
  ): Promise<ResponseStandard<SignInResponseDto | null>> {
    const result = await this.authService.googleSignIn(
      signInWithGoogleDto.idToken,
    );
    const { hasError, message } = result;
    if (hasError || !result.data) throw new BadRequestException(message);
    const { accessToken, refreshToken } = result.data;
    // set cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return result;
  }
}
