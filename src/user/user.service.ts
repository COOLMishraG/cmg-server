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
    async createUser(Name:string , email:string , Phone:number , UserId:string , PNR:string[]): Promise<User>{
        const newUser = this.userRepository.create({
            Name,
            email,
            Phone,
            UserId,
            PNR
        });
        return this.userRepository.save(newUser);
    }




}
