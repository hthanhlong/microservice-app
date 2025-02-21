import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'notification',
  version: '1',
})
export class NotificationController {
  @Get()
  getNotifications() {
    return 'Hello World notification';
  }
}
