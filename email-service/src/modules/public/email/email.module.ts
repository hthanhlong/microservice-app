import { Module } from '@nestjs/common';
import { KafkaModule } from '../../internal/kafka/kafka.module';
@Module({
  imports: [KafkaModule.register('email-service-group')],
  controllers: [],
  providers: [],
})
export class EmailModule {}
