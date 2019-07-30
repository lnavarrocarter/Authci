export declare class UserEntity {
    id: number;
    created: Date;
    username: string;
    password: string;
    hashPassword(): Promise<void>;
    toResponseObject(showToken?: boolean): any;
    comparePassword(attempt: string): Promise<any>;
    private readonly token;
}
