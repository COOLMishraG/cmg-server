import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { MongoRepository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private ticketRepository : MongoRepository<Ticket>){}
    async createTicket(PNR:number ,journeyDate:Date ,Time:String,
        Price:number,Name:string , From:string , To:string):Promise<Ticket>{
            const ticket = this.ticketRepository.create({
                PNR,
                journeyDate,
                Time,
                Price,
                Name,
                From,
                To
            })
            return this.ticketRepository.save(ticket);
        }
        async modifiyTicket(pnr: number, updateData: any): Promise<Ticket> {
            // Find the existing ticket by PNR
            const ticket = await this.ticketRepository.findOne({ where: { PNR: pnr } });
            console.log('Found ticket:', ticket);
            // Check if ticket was found
            if (!ticket) {
                throw new Error('Ticket not found');
            }
    
            // Merge update data into the existing ticket
            this.ticketRepository.merge(ticket, updateData);
    
            // Save and return the updated ticket
            return this.ticketRepository.save(ticket);
        }
        async cancleTicket(pnr:number){
            return this.ticketRepository.delete({PNR:pnr});
        }
}
