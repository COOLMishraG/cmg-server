import { Body, Controller, Post , Put , Delete, Param} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';

@Controller()
export class TicketController {
    constructor(private readonly ticketservice  : TicketService){}
@Post(':user/ticket')
async createTicket(@Param('user') userid : string ,@Body() createTicketDto : {PNR:number ,journeyDate:Date ,Time:String,
    Price:number,Name:string , From:string , To:string
  }) : Promise<Ticket>{
    const{PNR , journeyDate , Time , Price , Name , From , To} = createTicketDto;
    
    return this.ticketservice.createTicket(PNR , journeyDate , Time , Price , Name , From , To , userid);
  }

@Put(':pnr')
async modifiyTicket( @Param('pnr') pnr:number , @Body()  updateData:any):Promise<Ticket>{
    return this.ticketservice.modifiyTicket(pnr , updateData);
}
@Delete(':pnr')
async cancleTicket(@Param('pnr') pnr: number): Promise<any> {
    if (pnr === null || pnr === undefined) {
        throw new Error('pnr is null or undefined');
    }
    return this.ticketservice.cancelTicket(pnr).catch(error => {
        console.error('Error cancelling ticket:', error);
        throw new Error('Failed to cancel ticket');
    });
}
}