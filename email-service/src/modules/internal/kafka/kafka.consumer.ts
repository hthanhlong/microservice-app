import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  onModuleInit() {
    console.log('KafkaConsumer ready');
  }

  @MessagePattern('test-topic')
  handleMessage(@Payload() message: any) {
    console.log(`Received message:`, message);
  }
}
