import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity'
import { UserController } from './user.controller';
import { UserServices } from './user.services';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserServices],
})

export class UserModule {}
