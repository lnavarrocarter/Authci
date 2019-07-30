import { UserServices } from './user.services';
import { UserDTO } from './create-user.dto';
export declare class UserController {
    userService: UserServices;
    constructor(userService: UserServices);
    showAllUser(res: any): Promise<any>;
    showOneUser(id: any, res: any): Promise<any>;
    login(data: UserDTO): Promise<import("./create-user.dto").UserRO>;
    register(data: UserDTO): Promise<import("./create-user.dto").UserRO>;
}
