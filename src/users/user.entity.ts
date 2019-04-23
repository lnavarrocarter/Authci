import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('user')
export class UserEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @CreateDateColumn()
     created: Date;

     @Column({
         type: 'varchar',
         unique: true,
         width: 200,
     })
     username: string;

     @Column()
     password: string;

     @BeforeInsert()
     async hashPassword(){
         this.password = await bcrypt.hash(this.password, 8);
     }

     toResponseObject(showToken: boolean = true) {
         const { id, created, username, token } = this;
         const responseObject: any = { id, created, username}
         if (showToken){
             responseObject.token = token;
         }

         return responseObject;
     }


     async comparePassword(attempt: string){
         return bcrypt.compare(attempt, this.password);
     }

     private get token(){
         const {id, username} = this;
         return jwt.sign(
            {
             id,
             username,
             },
            process.env.SECRET,
            {
             expiresIn : '7d',
            },
         )
     }
} 
