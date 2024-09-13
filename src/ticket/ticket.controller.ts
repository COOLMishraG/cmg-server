import { Body, Controller, Post , Put , Delete, Param, Get} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';

@Controller()
export class TicketController {
    constructor(private readonly ticketservice  : TicketService){}
@Post(':user/ticket')
async createTicket(@Param('user') userid : string ,@Body() createTicketDto : {PNR:string ,journeyDate:Date ,Time:String,
    Price:string,Name:string , From:string , To:string , BusNo:string , departTime:string , arrivalTime:string,
  }) : Promise<Ticket>{
    const{PNR , journeyDate , Time , Price , Name , From , To , BusNo , departTime , arrivalTime} = createTicketDto;
    //console.log(typeof(PNR));
    return this.ticketservice.createTicket(PNR , journeyDate , Time , Price , Name , From , To  , BusNo , userid , departTime , arrivalTime);
  }

@Put(':user/:pnr')
async modifiyTicket( @Param('pnr') pnr:string ,
@Param('user') userid : string , @Body()  updateData:any):Promise<Ticket>{
    //console.log(typeof(pnr));
    return this.ticketservice.modifiyTicket(pnr, updateData , userid);
}
@Delete('user/:pnr')
async cancleTicket(@Param('pnr') pnr: string ,
    @Param('user') userid: string): Promise<any> {
    if (pnr === null || pnr === undefined) {
        throw new Error('pnr is null or undefined');
    }
    return this.ticketservice.cancelTicket( pnr , userid).catch(error => {
        console.error('Error cancelling ticket:', error);
        throw new Error('Failed to cancel ticket');
    });
} 
@Get(':user/Booking')
async getAllPnrs(@Param('user') userid: string): Promise<string[]> {
    return this.ticketservice.getAllPnrs(userid);}
}