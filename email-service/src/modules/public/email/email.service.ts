import { Injectable } from '@nestjs/common';
import { KafkaService } from '../../internal/kafka/kafka.service';

@Injectable()
export class EmailService {
  constructor(private readonly kafkaService: KafkaService) {}

  verifyCode(message: any) {
    console.log(message);
  }
}
