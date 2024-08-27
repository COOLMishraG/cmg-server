import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';

@Module({
  providers: [MessagingService],
  exports: [MessagingService], // Export the service if it will be used in other modules
})
export class MessagingModule {}
