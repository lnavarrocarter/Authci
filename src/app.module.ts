import { Module, MulterModule } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UploadModule } from './upload/upload.module';

import * as multer from 'multer';
import { EmailModule } from './email/email.module';
import { LoggingInterceptor } from './shared/logging.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ncai.cl',
      port: 3306,
      username: 'cnc46140_autci',
      password: 'qweasd123',
      database: 'cnc46140_authci',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register({
      dest: '/uploads',
      storage: multer.memoryStorage(),
    }),
    UserModule,
    UploadModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    }
  ],
  controllers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
