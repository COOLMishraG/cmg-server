import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { User } from './user.entitiy';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: MongoRepository<User>,
    ){}
    async createUser(Name:string , email:string , Phone:number , UserId:string , PNR:number[]): Promise<User>{
        const newUser = this.userRepository.create({
            Name,
            email,
            Phone,
            UserId,
            PNR
        });
        return this.userRepository.save(newUser);
    }
    async addPNRToUser(userId: string , pnr:number):Promise<void>{
        const user =await this.userRepository.findOne({where : {UserId:userId}});
        if(!user){
            throw new Error('usre not found');
        }
        if(!user.PNR){
            user.PNR = [];
        }
        user.PNR.push(pnr);
        await this.userRepository.save(user);
    }
    async removePNRFromUser(userId: string, pnr: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { UserId: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.PNR || user.PNR.length === 0) {
            throw new Error('User has no PNRs');
        }

        const initialLength = user.PNR.length;
        user.PNR = user.PNR.filter(existingPnr => existingPnr !== pnr);

        if (user.PNR.length === initialLength) {
            throw new Error('PNR not found for this user');
        }

        await this.userRepository.save(user);
    }
}