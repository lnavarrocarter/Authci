import { Get, Controller, UseGuards, Res, HttpStatus, Param, Post, Body } from "@nestjs/common";
import { AuthGuard } from "src/shared/auth.gaurd";
import { RecordServices } from "./record.services";
import { RecordDTO } from "./record.dto";



@Controller('api')
export class RecordController {
    constructor(private recordServices: RecordServices){}

    @Get('records')
    @UseGuards(new AuthGuard())
    async showAllRecords(@Res() res){
        const Records = await this.recordServices.allRecords();
        return res.status(HttpStatus.OK).json({
            message : 'Records(s) encontrado(s) correctamente.',
            user : Records,
        });
    }

    @Get('records/:id')
    @UseGuards(new AuthGuard())
    async showOneRecord(@Param('id') id, @Res() res) {
        const User = await this.recordServices.showOne(id);
        return res.status(HttpStatus.OK).json({
            message : 'Record encontrado correctamente.',
            user : User,
        });
    }

    @Post('records')
    async saverecord(@Body() data: RecordDTO){
        return await this.recordServices.saveRecord(data);
    }

}