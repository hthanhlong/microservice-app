import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AxiosModule } from './modules/axios/axios.module';
@Module({
  imports: [KafkaModule, AxiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
