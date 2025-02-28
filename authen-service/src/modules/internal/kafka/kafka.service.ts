import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TOPICS } from './topic';
import chalk from 'chalk';
import { Logger } from '@nestjs/common';
import { VerifyCodeEvent } from './events';
const logger = new Logger('KafkaService');
@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
    logger.log(chalk.green('Kafka connected ✅'));
  }

  sendVerifyCode(verifyCode: VerifyCodeEvent) {
    this.kafkaClient.emit(TOPICS.VERIFY_CODE, verifyCode);
  }
}
