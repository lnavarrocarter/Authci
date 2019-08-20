import { IsNotEmpty } from 'class-validator';

export class RecordDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    curso: string;

    @IsNotEmpty()
    letra: string;

    @IsNotEmpty()
    indicaciones: string;

    @IsNotEmpty()
    lugar: string;

    @IsNotEmpty()
    motivo: string;

    @IsNotEmpty()
    diagnostico: string;

}

export class RecordRO {
    name: string;
    curso : string;
    letra: string;
    created : Date;
}
