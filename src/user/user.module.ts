import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entitiy';

@Module({
  imports:[TypeOrmModule.forFeature([User])],  
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
