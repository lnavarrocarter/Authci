import { Module } from '@nestjs/common';
import { AuthServices } from './../auth/auth.services';
import { UserModule } from '../users/user.module';


@Module({
  imports: [UserModule],
  providers: [AuthServices],
})
export class AuthModule {}
