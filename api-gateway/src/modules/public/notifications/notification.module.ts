import { Module } from '@nestjs/common';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
