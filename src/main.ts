import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { enviroment } from './env.config';



const port = enviroment.PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule); //{ httpsOptions,}
  app.enableCors ({
    origin: '*',
  });
  await app.listen(port);
  Logger.log(`server lising to port: ${port}`, 'Bootstrap');
}
bootstrap();
