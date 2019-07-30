"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailServices = class EmailServices {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "ncai.cl",
            port: 465,
            secure: true,
            auth: {
                user: 'website@ncai.cl',
                pass: 'm^74$&Tc5yLx'
            }
        });
    }
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
                }
                else {
                    return true;
                }
            });
        });
    }
    sendEmail(bodyHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = yield this.transporter.sendMail({
                from: '"Website Ncai 👻" <website@ncai.cl>',
                to: "info@ncai.cl",
                subject: "Hello ✔️ You Have a Question 😍😍 from website..",
                text: "Nuevo Mensaje de tu Web",
                html: bodyHtml
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return {
                "status": "Message sent",
                "messageId": info.messageId,
                "preview": nodemailer.getTestMessageUrl(info)
            };
        });
    }
};
EmailServices = __decorate([
    common_1.Injectable()
], EmailServices);
exports.EmailServices = EmailServices;
//# sourceMappingURL=email.services.js.map