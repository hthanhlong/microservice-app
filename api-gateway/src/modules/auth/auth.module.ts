import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ENDPOINTS } from './routes';
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_ROUTES',
      useFactory: (configService: ConfigService) => {
        const authServiceUrl = configService.get<string>('authService.url');
        if (!authServiceUrl) throw new Error('AUTH_SERVICE_URL is not defined');
        return {
          signUp: `${authServiceUrl}/${ENDPOINTS.v1.signUp}`,
          signIn: `${authServiceUrl}/${ENDPOINTS.v1.signIn}`,
          googleSignIn: `${authServiceUrl}/${ENDPOINTS.v1.googleSignIn}`,
          refreshTokens: `${authServiceUrl}/${ENDPOINTS.v1.refreshTokens}`,
          signUpVendor: `${authServiceUrl}/${ENDPOINTS.v1.signUpVendor}`,
          verifyCode: `${authServiceUrl}/${ENDPOINTS.v1.verifyCode}`,
        };
      },
      inject: [ConfigService],
    },
    AuthService,
  ],
})
export class AuthModule {}
