import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IVerifyCode } from './interfaces';
import { MailerService } from '../mailer/mailer.service';
@Controller('kafka')
export class KafkaController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('verify-code')
  async verifyCode(@Payload() data: IVerifyCode) {
    await this.mailerService.sendEmail(data.email, 'Verify Code', data.code);
  }
}
