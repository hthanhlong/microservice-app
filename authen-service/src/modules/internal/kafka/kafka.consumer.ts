import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import chalk from 'chalk';
import { Logger } from '@nestjs/common';
const logger = new Logger('KafkaConsumer');
@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  onModuleInit() {
    logger.log(chalk.green('KafkaConsumer ready ✅'));
  }

  @MessagePattern('test-topic')
  handleMessage(@Payload() message: any) {
    logger.log(chalk.green(`Received message:`, message));
  }
}
