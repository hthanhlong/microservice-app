import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TOPICS } from './topic';
@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
    console.log('Kafka connected');
  }

  sendVerifyCode(email: string, verifyCode: string) {
    this.kafkaClient.emit(TOPICS.VERIFY_CODE, {
      email,
      verifyCode,
    });
  }
}
