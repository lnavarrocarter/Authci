import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";



@Entity('ticket')
export class TicketEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     numero_ticket: number;
}