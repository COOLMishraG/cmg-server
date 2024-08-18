import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Ticket{
@ObjectIdColumn()
id:ObjectId;
@Column()
PNR:number;

@Column()
journeyDate:Date;

@Column()
Time:String;

@Column()
Price:number;

@Column()
Name:string;

@Column()
From:string;

@Column()
To:string;

}
