import { Module, MulterModule } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UploadModule } from './upload/upload.module';
import * as multer from 'multer';




@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MulterModule.register({
      dest: '/uploads',
      storage: multer.memoryStorage(),
    }),
    UserModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    }
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
