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
    async removePNRToUser(userId:string , pnr:number):Promise<void>{
        const user = await this.userRepository.findOne({where:{UserId:userId}});
        if(!user){
            throw new Error('usre not found');
        }
        
        console.log('User before PNR removal:', user);
    user.PNR = user.PNR.filter(existingPnr => existingPnr !== pnr);
    console.log('User after PNR removal:', user);
        await this.userRepository.save(user);
    }
}
