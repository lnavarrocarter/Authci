import { Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, Get, Param, Res, Request, MulterModule } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('Upload')
export class UploadController {
    constructor() {}

    @Post()
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
    async uploadFile(@UploadedFile() file, @Request() req) {
        console.log(file);
        console.log(req.files)
        //fs.createReadStream('./../uploads/' + file.originalname).pipe(fs.createWriteStream('./../uploads/files/'+ file.originalname));
    }

    @Get()
    seeUploadFile(@Param('impath') image, @Res() res) {
        return res.sendFile(image, {root : 'uploads'})
    }
}
