import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDTO } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserServices {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectModel('Users') 
    private readonly userModel: Model<User>
    ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);
    return await createdUser.save();
  }

  async getUser(userId): Promise<User> {
    return await this.userModel.
      findById(userId).
      exec();
  }

  async getAllUser(): Promise<User> {
    return await this.userModel.
      find().
      exec();
  }

  async updateUser(userId, createUserDTO: CreateUserDTO): Promise<User> {
    const updateUser = await this.userModel
    .findByIdAndUpdate(userId, createUserDTO, {new : true});
    return updateUser;
  }

  async deleteUser(userId): Promise<User> {
    const deleteUser = await this.userModel
    .findByIdAndRemove(userId);
    return deleteUser;
  }

  async findOneByToken(token): Promise<User> {
    const tokenUser = await this.userModel.
    findOneByToken(token);
    return tokenUser;
  }

  async login(data: CreateUserDTO) {
    const  { username, password } = data;
    const user = await this.userRepository.find({where: {username}})
  }

  async register(data: CreateUserDTO) {

  }

}
