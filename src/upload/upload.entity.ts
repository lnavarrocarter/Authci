import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import * as sha1 from 'js-sha1';


@Entity('uploads')
export class UploadEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @CreateDateColumn()
     created: Date;

     @Column()
     path: string;

     @Column({
        type: 'varchar',
        unique: true,
        width: 200,
    })
     originalname: string;
     
     @Column()
     filename: string;

     @Column()
     encodefile: string;

     @BeforeInsert()
     private sha1EncodeFile(){
         this.encodefile = sha1(this.originalname);
     }

     toResponseObject() {
         const { id, created, originalname, path, encodefile, filename } = this;
         const responseObject: any = { id, encodefile, filename , created, originalname, path}
         return responseObject;
     }
} 
