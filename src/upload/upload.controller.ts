import { Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, Get, Param, Res, Request, MulterModule, HttpStatus, HttpException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadServices } from './upload.services';


@Controller('api/uploads')
export class UploadController {
    constructor( private UploadServ: UploadServices) {}

    @Post('up')
    @UseInterceptors(FileInterceptor('files', {
        storage: diskStorage({
            destination: './uploads'
            , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async uploadFile(@UploadedFile() file, @Request() req,@Res() res) {
        //console.log(file);
        const resp = await this.UploadServ.saveUpload(file);

        return res.status(HttpStatus.OK).json({
            message : 'Se ha subido correctamente el archivo',
            upload : resp,
        });
    }

    @Get(':encodeName')
    async seeUploadFile(@Param('encodeName') encodeName, @Res() res) {
        const file = await this.UploadServ.getFile(encodeName) 
        console.log(file);
        return res.sendFile(file.filename, {root : 'uploads'})
    }
}