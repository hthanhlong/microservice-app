import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AxiosModule } from '../../internal/axios/axios.module';

@Module({
  imports: [AxiosModule.register('auth')],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
