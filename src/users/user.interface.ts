import { Document } from 'mongoose';

export interface User extends Document {
    readonly usename: string;
    readonly password: number;
    readonly token: string;
    readonly created: Date;
}
