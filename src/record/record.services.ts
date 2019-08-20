import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RecordEntity } from "./record.entity";
import { Repository } from "typeorm";
import { RecordDTO } from "./record.dto";




@Injectable()
export class RecordServices{
    constructor(
        @InjectRepository(RecordEntity)
        private recordsRepository: Repository<RecordEntity>,
        ){}

    async allRecords(){
        let records = await this.recordsRepository.find();
        if(!records){
            throw new HttpException("No tenemos registros en la base de datos", HttpStatus.BAD_REQUEST);
        }
        Logger.log('Records encontrado! : ' + JSON.stringify(records));
        return records.map(map => map.toResponseObject());
    }

    async showOne(id: any){
        let record = await this.recordsRepository.findOne({where : {codeId : id }});
        if(!record){
            throw new HttpException('No tenemos registro de este codigo de registro: ' + id, HttpStatus.BAD_REQUEST);
        }
        Logger.log('Records encontrado! : ' + JSON.stringify(record));
        return record.toResponseObject();
    }


    async saveRecord(data: RecordDTO){
        const record = this.recordsRepository.create(data);
        Logger.log('Records Guardado! : ' + JSON.stringify(record))
        await this.recordsRepository.save(record);
        return record.toResponseObject();

    }
}