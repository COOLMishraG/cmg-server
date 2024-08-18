import { Body, Controller, Post , Param , Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entitiy';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}
@Post()
async create(@Body() createUserDto : {Name : string , email : string , Phone:number}) : Promise<User>{
    const {Name , email , Phone} = createUserDto;
    return this.userService.createUser(Name , email , Phone);
}

@Get()
send(){
    return "hii"
}
}
