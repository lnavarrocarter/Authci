import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailServices } from "./email.services";


@Module({
    controllers: [EmailController],
    providers: [EmailServices],
})

export class EmailModule{}