import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class ProductService {
  constructor(private readonly kafkaService: KafkaService) {}
}
