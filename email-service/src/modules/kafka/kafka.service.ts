import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(private readonly client: ClientKafka) {}

  sendMessage(topic: string, message: any) {
    this.client.emit(topic, message);
  }
}
