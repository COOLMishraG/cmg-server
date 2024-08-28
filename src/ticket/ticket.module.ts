import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
//import { MessagingService } from 'src/messaging/messaging.service';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports : [TypeOrmModule.forFeature([Ticket]) , UserModule , MessagingModule],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
