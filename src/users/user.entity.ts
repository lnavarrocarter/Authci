import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity { 
     @PrimaryGeneratedColumn('uuid')
     id : string;

     @CreateDateColumn()
     created: Date;

     @Column({
         type: 'text',
         unique: true,
     })
     username: string;

     @Column('text')
     password: string;

     @BeforeInsert()
     async hashPassword(){
         this.password = await bcrypt.hashPassword(this.password);
     }

     toResponseObject() {
         const { id, created, username } = this;
         return { id, created, username };
     }
} 