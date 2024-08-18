import { Column, Entity } from "typeorm";

@Entity()
export class Ticket{
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

}
