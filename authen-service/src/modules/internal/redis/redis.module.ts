import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'REDIS_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) =>
          new Redis({
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            password: configService.get<string>('REDIS_PASSWORD'),
          }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
