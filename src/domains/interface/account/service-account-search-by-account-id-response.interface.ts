/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAccount } from './account.interface';

export interface IServiceAccountSearchByAccountIdResponse {
    status: number;
    message: string;
    account: IAccount | null;
    errors: { [key: string]: any };
}
