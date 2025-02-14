import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class EmailService {
  constructor(private readonly kafkaService: KafkaService) {}
}
