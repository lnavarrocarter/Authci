import { UserEntity } from './user.entity';
import { UserDTO, UserRO } from './create-user.dto';
import { Repository } from 'typeorm';
export declare class UserServices {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    showOne(id: number): Promise<UserRO>;
    showAll(): Promise<UserRO[]>;
    login(data: UserDTO): Promise<UserRO>;
    register(data: UserDTO): Promise<UserRO>;
    findOneByToken(token: any): Promise<boolean>;
}
