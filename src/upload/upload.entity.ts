import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, ManyToOne } from 'typeorm';
import * as sha1 from 'js-sha1';
import { UserEntity } from 'src/users/user.entity';


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

     @ManyToOne(type  => UserEntity, author => author.upload)
     author: UserEntity;

     @BeforeInsert()
     private sha1EncodeFile(){
         this.encodefile = sha1(this.originalname);
         this.path = "/api/file/" + this.encodefile;
     }

     toResponseObject(showParameters: boolean = false) {
         const { id, created, originalname, path, filename, author } = this;
         const responseObject: any = {
             id,
             created,
             originalname,
             path,
            }
        if(showParameters){
            responseObject.filename = filename;
        }
         return responseObject;
     }
} 
