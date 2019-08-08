import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, ManyToOne, OneToMany } from 'typeorm';
import * as sha1 from 'js-sha1';
import { UserEntity } from 'src/users/user.entity';


@Entity('uploads')
export class UploadEntity {
     @PrimaryGeneratedColumn()
     id: number;

     @CreateDateColumn()
     created: Date;

     @Column()
     location: string;

     @Column({
        type: 'varchar',
        unique: true,
        width: 200,
    })
     originalname: string;
     
     @Column()
     key: string;

     @Column()
     path: string;

     @Column()
     bucket: string;

     @Column()
     encodefile: string;

     @ManyToOne(type  => UserEntity, author => author.upload)
     author: UserEntity;

     @BeforeInsert()
     private sha1EncodeFile(){
         this.encodefile = sha1(this.originalname);
         this.path = "/api/files/" + this.encodefile;
     }

     toResponseObject(showParameters: boolean = false) {
         const { id, created, originalname, location, key, author, encodefile, path } = this;
         const responseObject: any = {
             id,
             created,
             originalname,
             encodefile,
             path,
             author: author.toResponseObject(false),
            }
        if(showParameters){
            responseObject.key = key;
            responseObject.location = location;
        }
         return responseObject;
     }
} 
