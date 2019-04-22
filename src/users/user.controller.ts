import { Controller, Get, Post, Body, Res, HttpStatus, Param, NotFoundException, Put, Query, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { UserServices } from './user.services';
import { AuthGuard } from './../shared/auth.gaurd'

import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('Users')
export class UserController {
    constructor(public userServ: UserServices) {}
    @Get()
    @UseGuards(new AuthGuard())
    async findAll(@Res() res) {
        const allUsers = await this.userServ.getAllUser();
        return res.status(HttpStatus.OK).json({
            message : 'Usuario(s) encontrado(s) correctamente.',
            user : allUsers,
        });
    }

    @Get(':userId')
    @UseGuards(new AuthGuard())
    async getUser(@Res() res, @Param('userId', new ValidateObjectId()) userId) {
        const fetchedUser = await this.userServ.getUser(userId);
        if (!fetchedUser) {
            throw new NotFoundException('${userId} no existe en nuestro registros!');
        }
        return res.status(HttpStatus.OK).json({
            message : 'El registro se encontro correctamente.',
            user : fetchedUser,
        });
    }

    @Post()
    @UseGuards(new AuthGuard())
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO ) {
        const addedUser = await this.userServ.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message : 'Usuario agregado correctamente a la base de datos.',
            user : addedUser,
        });
    }

    @Put()
    @UseGuards(new AuthGuard())
    async updateUser(
        @Res() res,
        @Query('userId', new ValidateObjectId()) userId,
        @Body() createUserDTO: CreateUserDTO) {
            const  updateUser = await this.userServ.updateUser(userId, createUserDTO);
            if (!updateUser) {
                throw new NotFoundException('${userId} no existe en nuestro registros!');
            }
            return res.status(HttpStatus.OK).json({
                message : 'Registro del usuario modificado correctamente',
                user : updateUser,
            });
    }

    @Delete()
    @UseGuards(new AuthGuard())
    async deleteUser(@Res() res, @Query('userId', new ValidateObjectId()) userId) {
        const deleteUser = await this.userServ.deleteUser(userId);
        if (!deleteUser) {
            throw new NotFoundException( userId + 'no existe en nuestro registros!');
        }
        return res.status(HttpStatus.OK).json({
            message : 'El usuario se ha eliminado correctamente.',
            user : deleteUser,
        });
    }

    @Post('login')
    login (@Body() data) {
        this.userServ.login(data);
    }

    @Post('register')
    register(@Body() data) {
        this.userServ.register(data);
    }


}
