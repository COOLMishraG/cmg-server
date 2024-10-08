import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { User } from 'src/user/user.entitiy';
import { MongoRepository } from 'typeorm';
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
    
    async createTicket(PNR:string ,journeyDate:Date ,Time:String,
        Price:String,Name:string , From:string , To:string , BusNo:string ,userId:string , DepartureTime:string , ArrivalTime:string):Promise<Ticket>{
            const ticket = this.ticketRepository.create({
                PNR,
                journeyDate,
                Time,
                Price,
                Name,
                From,
                To,
                BusNo,
                DepartureTime,
                ArrivalTime
            })

            const createdTicket = await this.ticketRepository.save(ticket);
            const Contact = await this.userservices.getPhoneNumber(userId);
            console.log(createdTicket)
            await this.MessagingService.sendSms("+91" + Contact.toString() ,`\nTicket Confirmed:${userId}\nName:${createdTicket.Name}\nPNR:${createdTicket.PNR}\nBUSNO:${createdTicket.BusNo}\nTo : ${createdTicket.To}\nFrom: ${createdTicket.From}\nDPT: ${createdTicket.DepartureTime}\nAVT: ${createdTicket.ArrivalTime}\nPrice: ${createdTicket.Price}\nBoarding allowed At ${createdTicket.From} only\n-CMGTRAVELS`);
            await this.userservices.addPNRToUser(userId , createdTicket.PNR);
            const newUser = await this.userservices.getUser(userId);
            console.log(newUser.Name);
            console.log(newUser.email);
            console.log(newUser.Phone);
            console.log(newUser.UserId);
            console.log(newUser.PNR);            
            return createdTicket;
        }
        async modifiyTicket(pnr: string, updateData: any , userid:string): Promise<Ticket> {
            // Find the existing ticket by PNR
            const ticket = await this.ticketRepository.findOne({ where: { PNR: pnr } });
            console.log('Found ticket:', ticket);
            
            // Check if ticket was found
            if (!ticket) {
                throw new Error(`Ticket not found ${pnr}`);
                
            }
            
            const currUser:User = await  this.userservices.getUser(userid);
            if(updateData.password!==currUser.password){
                throw new Error(`Invalid password ${updateData.password} `);
            }
    
            // Merge update data into the existing ticket
            this.ticketRepository.merge(ticket, updateData);
    
            // Save and return the updated ticket
            return this.ticketRepository.save(ticket);
        }
        async cancelTicket(pnr: string , userid:string): Promise<any> {
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
        async getAllPnrs(userid:string):Promise<string[]>{
            return await this.userservices.getAllPnrs(userid);
        }
        async getTicket(pnr: string , userid:string):Promise<Ticket>{
            return this.ticketRepository.findOne({where:{ PNR:pnr} });
        }
}
