import { Controller } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @MessagePattern('verify-code')
  verifyCode(@Payload() data: any) {
    console.log(data);
    // send email to customer
  }
}
