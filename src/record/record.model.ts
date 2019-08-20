import { Module } from '@nestjs/common';
import { RecordEntity } from './record.entity'
import { RecordController } from './record.controller';
import { RecordServices } from './record.services';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([RecordEntity]),
    ],
    controllers: [RecordController],
    providers: [RecordServices],
})

export class RecordModule {}
