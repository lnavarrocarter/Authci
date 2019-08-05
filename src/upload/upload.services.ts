import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { UploadEntity } from './upload.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UpDTO, UpRO } from "./upload.dto";

@Injectable()
export class UploadServices {
    constructor(
        @InjectRepository(UploadEntity)
        private uploadRepository: Repository<UploadEntity>,
    ){}

    async getFile(encodeName: any): Promise<UpRO>{
        let file = await this.uploadRepository.findOne({where : {encodefile : encodeName}});
        if(!file){
            throw new HttpException('No tenemos registro de este codigo de archivo: ' + encodeName, HttpStatus.BAD_REQUEST);
        }
        Logger.log('Archivo encontrado! : ' + JSON.stringify(file));
        return file.toResponseObject();
    }

    async saveUpload( data: UpDTO ): Promise<UpRO>{
        const { originalname } = data;
        let upload = await this.uploadRepository.findOne({where : {originalname}});
        if(upload){
            throw new HttpException('Archivo ya se encuentra en nuestro registros', HttpStatus.BAD_REQUEST);
        }
        upload = await this.uploadRepository.create(data)
        Logger.log('Upload Success! : ' + JSON.stringify(upload));
        await this.uploadRepository.save(upload);
        return upload.toResponseObject();
    }
}
