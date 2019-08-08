import { Module } from '@nestjs/common';

import { AuthServices } from './../auth/auth.services';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServices } from 'src/users/user.services';
import { UserEntity } from 'src/users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [AuthServices, UserServices],
})
export class AuthModule {}
