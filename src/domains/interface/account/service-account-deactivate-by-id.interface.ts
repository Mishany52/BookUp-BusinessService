/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAccount } from './account.interface';

export interface IServiceAccountDeactivateResponse {
    status: number;
    message: string;
    data: IAccount | null;
    errors: { [key: string]: any } | null;
}
