import { Controller, Post,Res, HttpStatus,Body} from '@nestjs/common';
import { EmailServices } from './email.services';


@Controller('api/email')
export class EmailController{
    constructor(private emailServices: EmailServices) {}

    @Post('send')
    async sendemail(@Res() res, @Body() data: any){
        console.log(res.connection.remoteAddress);
        if(this.emailServices.verify()){
            await this.emailServices.sendEmail(data.html).then((r) => {
                console.log(r);
                return res.status(HttpStatus.OK).json({
                    message : 'Correo enviado correctamente',
                    data : r,
                });
            } );
        }
    }
}