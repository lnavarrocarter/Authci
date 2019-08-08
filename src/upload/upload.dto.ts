import { IsNotEmpty } from 'class-validator';
import { UserRO } from 'src/users/create-user.dto';

export class UpDTO {

    @IsNotEmpty()
    readonly originalname: string;

    @IsNotEmpty()
    readonly path: string;

    @IsNotEmpty()
    readonly filename: string;

}

export class UpRO {
    id: string;
    created : Date;
    originalname: string;
    author?: UserRO;
    encondefile: string;
    path: string;
    location?:string;
    key?: string;
}
