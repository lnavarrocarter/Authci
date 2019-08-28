"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const upload_controller_1 = require("./upload.controller");
const typeorm_1 = require("@nestjs/typeorm");
const upload_entity_1 = require("./upload.entity");
const upload_services_1 = require("./upload.services");
const user_entity_1 = require("src/users/user.entity");
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([upload_entity_1.UploadEntity, user_entity_1.UserEntity]),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_services_1.UploadServices],
    })
], UploadModule);
exports.UploadModule = UploadModule;
//# sourceMappingURL=upload.module.js.map