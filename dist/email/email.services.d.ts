export declare class EmailServices {
    transporter: any;
    verify(): Promise<any>;
    sendEmail(bodyHtml: any): Promise<{
        "status": string;
        "messageId": any;
        "preview": any;
    }>;
}
