import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('test-topic');
    await this.kafkaClient.connect();
  }

  consumeMessage(message: any) {
    console.log('Received message:', message);
  }
}
