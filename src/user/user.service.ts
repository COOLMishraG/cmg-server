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
    async createUser(Name:string , email:string , Phone:string , UserId:string ,password:string , PNR:string[]): Promise<User>{
        console.log("user created")
        const newUser = this.userRepository.create({
            Name,
            email,
            Phone,
            UserId,
            password,
            PNR
        });
        console.log(newUser.Name);
        console.log(newUser.email);
        console.log(newUser.Phone);
        console.log(newUser.UserId);
        console.log(newUser.PNR);

        return this.userRepository.save(newUser);
    }
    async addPNRToUser(userId: string , pnr:string):Promise<void>{
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
    async removePNRFromUser(userId: string, pnr:string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { UserId: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.PNR || user.PNR.length === 0) {
            throw new Error('User has no PNRs');
        }
        console.log(typeof(pnr));
        const initialLength = user.PNR.length;
        user.PNR = user.PNR.filter(existingPnr => existingPnr !== pnr);

        if (user.PNR.length === initialLength) {
            throw new Error('PNR not found for this user');
        }

        await this.userRepository.save(user);
    }
    async getAllPnrs(userId:string):Promise<string[]>{
        const user = await this.userRepository.findOne({where : {UserId:userId}});
        if(!user){
            throw new Error('usre not found');
        }
        return user.PNR;
    }
    async getPhoneNumber(userId:string):Promise<String>{
        const user = await this.userRepository.findOne({where : {UserId:userId}});
        if(!user){
            throw new Error('usre not found');
        }
        return user.Phone.toString();
    }
    async getUser(userId: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { UserId: userId } });
            return user || null; // Return null if no user is found
        } catch (error) {
            console.error(`Error fetching user with UserId ${userId}:`, error);
            throw new Error('Failed to fetch user'); // Throw a generic error or handle it as needed
        }
    }
      
}