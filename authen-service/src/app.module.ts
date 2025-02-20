import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './modules/internal/kafka/kafka.module';
import { RedisModule } from './modules/internal/redis/redis.module';
import { PrismaModule } from './modules/internal/prisma/prisma.module';
import { AuthModule } from './modules/public/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
    RedisModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
