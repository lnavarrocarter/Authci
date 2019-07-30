import { EmailServices } from './email.services';
export declare class EmailController {
    private emailServices;
    constructor(emailServices: EmailServices);
    sendemail(res: any, data: any): Promise<void>;
}
