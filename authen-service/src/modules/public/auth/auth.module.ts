import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { KafkaModule } from '../../internal/kafka/kafka.module';
import { KeyService } from '../../internal/key/keys.service';
@Module({
  imports: [
    KafkaModule,
    JwtModule.register({
      secret: 'refresh_secret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KeyService],
})
export class AuthModule {}
