import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/ticket.entity';
import { MessagingModule } from './messaging/messaging.module';
import { NotificationsController } from './messaging/notifications.controller';  // Import NotificationsController
import { User } from './user/user.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://COOLMishraG:mp15cb3802@anujmishra.4a84or4.mongodb.net/',
      database: 'CMG_database',
      entities: [User, Ticket],
      synchronize: true,
    }),
    UserModule,
    TicketModule,
    MessagingModule,
  ],
  controllers: [AppController, NotificationsController],  // Include NotificationsController here
  providers: [AppService],
})
export class AppModule {}
