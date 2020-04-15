import { Controller, Post, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    
    constructor(public TickeServ: TicketService){}
    
    @Get()
    async getticket(){
        return this.TickeServ.retornoData();
    }
}
