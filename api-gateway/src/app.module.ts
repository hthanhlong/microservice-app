import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AxiosModule } from './modules/axios/axios.module';
@Module({
  imports: [KafkaModule, AxiosModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
