import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AxiosModule } from './modules/axios/axios.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AxiosModule,
    AuthModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
