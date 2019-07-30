import { ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
export declare class HttpErrorFilter implements ExceptionFilter {
    catch(exeption: HttpException, host: ArgumentsHost): void;
}
