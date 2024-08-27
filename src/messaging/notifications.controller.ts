import { Controller, Post, Body } from '@nestjs/common';
import { MessagingService } from '../messaging/messaging.service';

@Controller()
export class NotificationsController {
  constructor(
    private readonly messagingService: MessagingService,
  ) {}

  @Post('send-sms')
  async sendSms(@Body() body: { to: string; message: string }) {
    return this.messagingService.sendSms(body.to, body.message);
  }

}