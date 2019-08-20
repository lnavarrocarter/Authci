import { Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, Get, Param, Res, Request, MulterModule, HttpStatus, HttpException, UseGuards, Logger } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadServices } from './upload.services';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/users/user.decorator';


import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Controller('api')
export class UploadController {
    constructor( private UploadServ: UploadServices) {}
    
    @Post('files/upload')
    @UseGuards(new AuthGuard())
    @UseInterceptors(FileInterceptor('files', {
        storage: diskStorage({
            destination: './uploads'
            , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
            }
        }),
        /*storage: multerS3({
            s3: s3,
            bucket: AWS_S3_BUCKET_NAME,
            acl: 'public-read',
            key: function(request, file, cb) {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            },
        }),*/
    }))
    async uploadFile(@User('id') user, @UploadedFile() file,@Res() res) {
        console.log(file)
        const resp = await this.UploadServ.saveUpload(user, file);
        return res.status(HttpStatus.OK).json({
            message : 'Se ha subido correctamente el archivo',
            upload : resp,
        });
    }

    @Get('files/:encodeName')
    async getUploadFile(@Param('encodeName') encodeName, @Res() res) {
        const file = await this.UploadServ.getFile(encodeName);
        return res.download(file.location, file.originalname);
    }


    @UseGuards(new AuthGuard())
    @Get("files")
    async getAlluploadFile(@User('id') user,@Res() res){
        Logger.log(`UserId : ${user}`)
        const files = await this.UploadServ.getAllFiles();
        return res.status(HttpStatus.OK).json({
            message : 'Listado de archivo disponibles',
            upload : files,
        });
    }

    @UseGuards(new AuthGuard())
    @Get("myfiles")
    async getAlluploadFileByUser(@User('id') user,@Res() res){
        Logger.log(`UserId : ${user}`)
        const files = await this.UploadServ.getAllFiles(user);
        return res.status(HttpStatus.OK).json({
            message : 'Listado de archivo disponibles',
            upload : files,
        });
    }
}