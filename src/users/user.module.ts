import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserServices } from './user.services';
import { UserEntity } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [UserServices],
})

export class UserModule {}
