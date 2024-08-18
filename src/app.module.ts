import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entitiy';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type:'mongodb',
    url:'mongodb+srv://COOLMishraG:mp15cb3802@anujmishra.4a84or4.mongodb.net/',
    database:'CMG_database',
    entities: [User , Ticket],
    synchronize: true, 
  }),
  UserModule,
  TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
