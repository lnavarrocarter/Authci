import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './upload.entity';
import { UploadServices } from './upload.services';
import { UserEntity } from 'src/users/user.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([UploadEntity, UserEntity]),
    ],
    controllers: [UploadController],
    providers: [UploadServices],
})

export class UploadModule {}