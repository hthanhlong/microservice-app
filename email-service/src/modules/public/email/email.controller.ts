import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('test-topic')
  verifyCode(@Payload() message: any) {
    this.emailService.verifyCode(message);
  }
}
