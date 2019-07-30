import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import * as nodemailer from "nodemailer";


@Injectable()
export class EmailServices {
    transporter: any = nodemailer.createTransport({
        host: "ncai.cl",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'website@ncai.cl', // generated ethereal user
          pass: 'm^74$&Tc5yLx' // generated ethereal password
        }
      });

    async verify(){
      return this.transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        } else {
          return true;
        }
      });
    }
    async sendEmail(bodyHtml: any){
          let info = await this.transporter.sendMail({
            from: '"Website Ncai 👻" <website@ncai.cl>', // sender address
            to: "info@ncai.cl", // list of receivers
            subject: "Hello ✔️ You Have a Question 😍😍 from website..", // Subject line
            text: "Nuevo Mensaje de tu Web", // plain text body
            html: bodyHtml // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          return {
            "status" : "Message sent",
            "messageId" : info.messageId,
            "preview" : nodemailer.getTestMessageUrl(info)
          }
    }
    
}