import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import * as nodemailer from "nodemailer";


@Injectable()
export class EmailServices {
    transporter: any = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_POST,
        secure: process.env.SMTP_SECURE, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
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
    async sendEmail(data: any){
          let { html, subject, email } = data
          let info = await this.transporter.sendMail({
            from: '"Website Ncai 👻" <website@ncai.cl>', // sender address
            to: "info@ncai.cl," + email, // list of receivers
            subject: subject, // Subject line
            html: html // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          return {
            "status" : "Message sent",
            "messageId" : info.messageId,
            "preview" : nodemailer.getTestMessageUrl(info)
          }
    }

    async sendEmailAttachment(bodyHtml: any, subjetc: string, adjunto: any,nameattach: any){
      let info = await this.transporter.sendMail({
        from: '"Ncai 👻" <website@ncai.cl>', // sender address
        to: "info@ncai.cl", // list of receivers
        subject: subjetc, // Subject line
        html: bodyHtml, // html body
        attachments : [
          {   // use URL as an attachment
            filename: nameattach,
            path: adjunto,
          },
        ]
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