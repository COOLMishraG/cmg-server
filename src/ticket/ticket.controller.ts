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
    //console.log(typeof(PNR));
    return this.ticketservice.createTicket(PNR , journeyDate , Time , Price , Name , From , To , userid);
  }

@Put(':user/:pnr')
async modifiyTicket( @Param('pnr') pnr:number , @Body()  updateData:any):Promise<Ticket>{
    //console.log(typeof(pnr));
    const temp:number = Number(pnr);
    return this.ticketservice.modifiyTicket(temp , updateData);
}
@Delete(':user/:pnr')
async cancleTicket(@Param('pnr') pnr: number ,
    @Param('user') userid: string): Promise<any> {
    if (pnr === null || pnr === undefined) {
        throw new Error('pnr is null or undefined');
    }
    const temp:number = Number(pnr);
    return this.ticketservice.cancelTicket(temp , userid).catch(error => {
        console.error('Error cancelling ticket:', error);
        throw new Error('Failed to cancel ticket');
    });
}
}