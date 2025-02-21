import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { KafkaModule } from '../../internal/kafka/kafka.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'refresh_secret',
    }),
    KafkaModule.register('auth-service-group'),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
