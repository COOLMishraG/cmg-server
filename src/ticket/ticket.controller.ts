import { Body, Controller, Post , Put , Delete, Param} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';

@Controller()
export class TicketController {
    constructor(private readonly ticketservice  : TicketService){}
@Post(':user/ticket')
async createTicket(@Body() createTicketDto : {PNR:number ,journeyDate:Date ,Time:String,
    Price:number,Name:string , From:string , To:string
  }) : Promise<Ticket>{
    const{PNR , journeyDate , Time , Price , Name , From , To} = createTicketDto;
    
    return this.ticketservice.createTicket(PNR , journeyDate , Time , Price , Name , From , To);
  }

@Put(':pnr')
async modifiyTicket( @Param('pnr') pnr:number , @Body()  updateData:any):Promise<Ticket>{
    return this.ticketservice.modifiyTicket(pnr , updateData);
}
@Delete(':pnr')
async cancleTicket(@Param('pnr') pnr : number){
    return this.ticketservice.cancleTicket(pnr);
}
}