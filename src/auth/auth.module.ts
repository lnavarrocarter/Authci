import { Module } from '@nestjs/common';
import { AuthServices } from './../auth/auth.services';
import { HttpStrategy } from './../shared/http.strategy';
import { UserModule } from '../users/user.module';


@Module({
  imports: [UserModule],
  providers: [AuthServices, HttpStrategy],
})
export class AuthModule {}
