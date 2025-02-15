import { Module } from '@nestjs/common';
import { KafkaModule } from './modules/kafka/kafka.module';
@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
