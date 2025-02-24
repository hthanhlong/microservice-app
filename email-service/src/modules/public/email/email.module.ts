import { Module } from '@nestjs/common';
import { KafkaModule } from '../../internal/kafka/kafka.module';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
@Module({
  imports: [KafkaModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
