import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import * as sha1 from 'js-sha1';

@Entity('record')
export class RecordEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     codeId: string;

     @CreateDateColumn()
     created: Date;

     @Column()
     name: string;

     @Column()
     curso: string;

     @Column()
     letra: string;

     @Column()
     clase: string;

     @Column()
     indicaciones: string;

     @Column()
     lugar: string;

     @Column()
     motivo: string;

     @Column()
     diagnostico: string;

     @Column()
     sugerencia: string;

     @BeforeInsert()
     async hashPassword(){
         this.codeId = await sha1(this.name + this.created)
     }

     toResponseObject() {
         const responseObject: any = this;
         return responseObject;
     }
} 
