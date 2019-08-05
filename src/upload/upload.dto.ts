import { IsNotEmpty } from 'class-validator';

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
    filename: string;
    encodefile: string;
}
