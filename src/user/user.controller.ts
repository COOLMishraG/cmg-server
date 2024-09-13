import { Body, Controller, Post , Param , Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entitiy';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}
@Post()
async create(@Body() createUserDto : {Name : string , email : string, password : string, Phone:string , UserId:string , PNR : string[]}) : Promise<User>{
    const {Name , email , Phone , UserId ,password , PNR} = createUserDto;
    return this.userService.createUser(Name , email , Phone , UserId ,password ,  PNR);
}

@Get(':userId')
async getUser(@Param('userId') userId : string) : Promise<User>{
    console.log("hiih")
    return this.userService.getUser(userId);
}
}
