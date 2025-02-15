import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  @MessagePattern('test-topic')
  handleMessage(@Payload() message: any) {
    console.log(`Received message:`, message);
  }
}
