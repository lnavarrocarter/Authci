
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDTO, UserRO } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserServices {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    ) {}

  async showOne(codeId: string): Promise<UserRO> {
    const user  = await this.userRepository.findOne({ where : { codeId }});
    if (!user) {
      throw new HttpException('Error en la consulta del usuario', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject(false);
  }

  async showAll(): Promise<UserRO[]> {
    const users =  await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }

  async login(data: UserDTO): Promise<UserRO> {
    const  { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username }});
    if (!user || !( await user.comparePassword(password))){
      throw new HttpException('Usuario o contraseña incorrecta', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  async register(data: UserDTO): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({where: { username }});
    if (user) {
      throw new HttpException('Este nombre de usuario ya esta en uso', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    Logger.log('UserCreated : ' + JSON.stringify(user));
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async findOneByToken(token: any){
    return true;
  }

}
