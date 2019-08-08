import { Controller, Post, UsePipes, ValidationPipe, Body } from "@nestjs/common";
import { UserDTO } from "dist/users/create-user.dto";
import { UserServices } from "src/users/user.services";


@Controller("auth")
export class AuthController {
    constructor(private userService: UserServices){}

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data: UserDTO) {
        return await this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() data: UserDTO) {
        return await this.userService.register(data);
    }
}