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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_module_1 = require("./users/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
const http_error_filter_1 = require("./shared/http-error.filter");
const upload_module_1 = require("./upload/upload.module");
const multer = require("multer");
const email_module_1 = require("./email/email.module");
const auth_module_1 = require("./auth/auth.module");
const record_model_1 = require("./record/record.model");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQLHOST,
                port: 3306,
                username: process.env.MYSQLUSER,
                password: process.env.MYSQLPASS,
                database: process.env.MYSQLDB,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            common_1.MulterModule.register({
                dest: '/uploads',
                storage: multer.memoryStorage(),
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            upload_module_1.UploadModule,
            email_module_1.EmailModule,
            record_model_1.RecordModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_error_filter_1.HttpErrorFilter,
            }
        ],
        controllers: [],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map