"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const multer_1 = require("multer");
const path_1 = require("path");
const upload_services_1 = require("./upload.services");
const auth_gaurd_1 = require("src/shared/auth.gaurd");
const user_decorator_1 = require("src/users/user.decorator");
const AWS = require("aws-sdk");
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
let UploadController = class UploadController {
    constructor(UploadServ) {
        this.UploadServ = UploadServ;
    }
    uploadFile(user, file, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            const resp = yield this.UploadServ.saveUpload(user, file);
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Se ha subido correctamente el archivo',
                upload: resp,
            });
        });
    }
    getAllFiles(type, user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`UserId : ${user} && tipo: ${type}`);
            let files;
            if (type == "all") {
                files = yield this.UploadServ.getAllFiles();
            }
            else if (type == "my") {
                files = yield this.UploadServ.getAllFiles(user);
            }
            else {
                throw new common_1.HttpException('Parametros Incorrectos para la busqueda.', common_1.HttpStatus.BAD_REQUEST);
            }
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Listado de archivo disponibles',
                upload: files,
            });
        });
    }
    getUploadFile(encodeName, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.UploadServ.getFile(encodeName);
            console.log(file);
            return res.sendFile(file.filename, { root: 'uploads' });
        });
    }
};
__decorate([
    common_1.Post('files/upload'),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    common_1.UseInterceptors(common_1.FileInterceptor('files', {
        storage: multer_1.diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                const key = randomName + "." + file.extension;
                cb(null, `${randomName}${path_1.extname(file.originalname)}`);
            },
        }),
    })),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.UploadedFile()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    common_1.Get("files/:type"),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, common_1.Param('type')), __param(1, user_decorator_1.User('id')), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getAllFiles", null);
__decorate([
    common_1.Get('file/:encodeName'),
    __param(0, common_1.Param('encodeName')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getUploadFile", null);
UploadController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [upload_services_1.UploadServices])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map