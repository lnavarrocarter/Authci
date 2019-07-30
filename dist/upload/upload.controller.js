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
let UploadController = class UploadController {
    constructor() { }
    uploadFile(file, req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            console.log(req.files);
        });
    }
    seeUploadFile(image, res) {
        return res.sendFile(image, { root: 'uploads' });
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(common_1.FileInterceptor('files', {
        storage: multer_1.diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${path_1.extname(file.originalname)}`);
            }
        })
    })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Param('impath')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "seeUploadFile", null);
UploadController = __decorate([
    common_1.Controller('Upload'),
    __metadata("design:paramtypes", [])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map