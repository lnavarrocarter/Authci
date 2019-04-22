import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
        return false;
    }
    request.user = this.validateToken(request.headers.authorization);
  }

  validateToken(auth: string) {
      if (auth.split(' ')[0] !== 'Bearer'){
          throw new HttpException('invalida Token', HttpStatus.FORBIDDEN);
      }

      const token = auth.split(' ')[1];
      try {
        const decode = jwt.verify(token, process.env.SECRET);
      } catch (err){
        const message = 'Token : ' + ( err.message || err.name );
        throw new HttpException(message, HttpStatus.FORBIDDEN);
      }
  }
}