import { Injectable } from '@nestjs/common';
import { UserServices } from '../users/user.services';

@Injectable()
export class AuthServices {
  constructor(private readonly usersService: UserServices) {}

  async validateUser(token: string): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.usersService.findOneByToken(token);
  }
}