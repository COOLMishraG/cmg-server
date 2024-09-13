import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Ticket{
@ObjectIdColumn()
id:ObjectId;
@Column()
PNR:string;

@Column()
journeyDate:Date;

@Column()
Time:String;

@Column()
Price:String;

@Column()
Name:string;

@Column()
From:string;

@Column()
To:string;

@Column()
BusNo:string;

@Column()
DepartureTime:string;

@Column()
ArrivalTime:string;

}
    