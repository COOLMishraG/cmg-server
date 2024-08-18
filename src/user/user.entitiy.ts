import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User{
@ObjectIdColumn()
id:ObjectId;

@Column()
Name:string;

@Column()
email:string;

@Column()
Phone:number;

@Column()
PNR:string;

}