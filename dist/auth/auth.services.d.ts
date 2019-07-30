import { UserServices } from '../users/user.services';
export declare class AuthServices {
    private readonly usersService;
    constructor(usersService: UserServices);
    validateUser(token: string): Promise<any>;
}
