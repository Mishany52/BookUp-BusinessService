import { IAccount } from './account.interface';

export interface IServiceAccountSingUpResponse {
    status: number;
    message: string;
    data: IAccount | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: { [key: string]: any } | null;
}
