import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User{
@ObjectIdColumn()
id:ObjectId;
@Column()
UserId:string;
@Column()
Name:string;

@Column()
email:string;

@Column()
Phone:number;

@Column({ type: 'simple-array', nullable: true })
PNR: number[];

}