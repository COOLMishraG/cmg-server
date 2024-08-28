import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { User } from 'src/user/user.entitiy';
import { MongoRepository } from 'typeorm';
import { error } from 'console';
import { UserService } from 'src/user/user.service';
import { MessagingService } from 'src/messaging/messaging.service';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private ticketRepository : MongoRepository<Ticket>,
        private userservices:UserService,
        private MessagingService:MessagingService
    ){}
        
    async createTicket(PNR:number ,journeyDate:Date ,Time:String,
        Price:number,Name:string , From:string , To:string , userId:string):Promise<Ticket>{
            const ticket = this.ticketRepository.create({
                PNR,
                journeyDate,
                Time,
                Price,
                Name,
                From,
                To
            })

            const createdTicket = await this.ticketRepository.save(ticket);
            const Contact = await this.userservices.getPhoneNumber(userId);
            await this.MessagingService.sendSms("+91" + Contact.toString() ,`Ticket Confirmed:${userId} \nPNR:${createdTicket.PNR},BUSN:2323\n To : ${createdTicket.To}  \nFrom: ${createdTicket.From}\nDOJ: ${createdTicket.journeyDate}\nDPT: ${createdTicket.Time} \nBoarding allowed At ${createdTicket.From} only  \n-CMGTRAVELS`);
            await this.userservices.addPNRToUser(userId , createdTicket.PNR);
            
            return createdTicket;
        }
        async modifiyTicket(pnr: number, updateData: any): Promise<Ticket> {
            // Find the existing ticket by PNR
            const ticket = await this.ticketRepository.findOne({ where: { PNR: pnr } });
            console.log('Found ticket:', ticket);
            
            // Check if ticket was found
            if (!ticket) {
                throw new Error(`Ticket not found ${pnr}`);
                
            }
    
            // Merge update data into the existing ticket
            this.ticketRepository.merge(ticket, updateData);
    
            // Save and return the updated ticket
            return this.ticketRepository.save(ticket);
        }
        async cancelTicket(pnr: number , userid:string): Promise<any> {
            const result = await this.ticketRepository.findOne({where:{ PNR:pnr} });
            //console.log(typeof(pnr));
            if (!result) {
                throw new Error(`Ticket not found ${pnr}`);
                
            }
            await this.ticketRepository.remove(result);
            await this.userservices.removePNRFromUser(userid , pnr);
            console.log(result);
            return result;
        }
        async getAllPnrs(userid:string):Promise<number[]>{
            return this.userservices.getAllPnrs(userid);
        }
}
