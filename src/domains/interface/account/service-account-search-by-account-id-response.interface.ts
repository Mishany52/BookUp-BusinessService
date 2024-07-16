import { IAccount } from './account.interface';

export interface IServiceAccountSearchByAccountIdResponse {
    status: number;
    message: string;
    account: IAccount | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: { [key: string]: any };
}
