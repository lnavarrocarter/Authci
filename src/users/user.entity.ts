import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as sha1 from 'js-sha1';
import { UploadEntity } from 'src/upload/upload.entity';

@Entity('user')
export class UserEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     codeId: string;

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

     @OneToMany(type => UploadEntity, upload => upload.author)
     upload: UploadEntity[];

     @BeforeInsert()
     async hashPassword(){
         this.password = await bcrypt.hash(this.password, 8);
         this.codeId = await sha1(this.username + this.created)
     }

     toResponseObject(showToken: boolean = true) {
         const { codeId, created, username, token } = this;
         const responseObject: any = { codeId, created, username}
         if (showToken){
             responseObject.token = `Bearer ${token}`;
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
