import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AxiosModule } from '../../internal/axios/axios.module';
import { RedisModule } from '../../internal/redis/redis.module';
@Module({
  imports: [AxiosModule.register('auth'), RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
