import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';



const port = process.env.PORT;
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secrets/private.key'),
    cert: fs.readFileSync('./secrets/certificate.crt'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors ({
    origin: '*',
    });
  await app.listen(port);
  Logger.log(`server lising to port: ${port}`, 'Bootstrap');
}
bootstrap();
