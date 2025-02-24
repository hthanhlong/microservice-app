import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TOPICS } from 'src/modules/internal/kafka/topic';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern(TOPICS.VERIFY_CODE)
  verifyCode(@Payload() message: any) {
    console.log(message);
    // this.emailService.verifyCode(message);
  }
}
