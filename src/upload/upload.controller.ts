import { Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, Get, Param, Res, Request, MulterModule, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadServices } from './upload.services';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/users/user.decorator';


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
        })
    }))
    async uploadFile(@User('id') user, @UploadedFile() file,@Res() res) {
        console.log(user);
        const resp = await this.UploadServ.saveUpload(user, file);
        console.log(resp);
        return res.status(HttpStatus.OK).json({
            message : 'Se ha subido correctamente el archivo',
            upload : resp,
        });
    }

    @Get('files/:encodeName')
    async getUploadFile(@Param('encodeName') encodeName, @Res() res) {
        const file = await this.UploadServ.getFile(encodeName) 
        return res.sendFile(file.filename, {
            root : 'uploads',
            headers : {
                'x-timestamp': Date.now(),
                'x-sent': true,
                'name': file.originalname,
                'origin':'Authci'
            }
        })
    }


    @UseGuards(new AuthGuard())
    @Get("files")
    async getAlluploadFile(@User('id') user,@Res() res){
        const files = await this.UploadServ.getAllFiles();
        return res.status(HttpStatus.OK).json({
            message : 'Listado de archivo disponibles',
            upload : files,
        });
    }
}