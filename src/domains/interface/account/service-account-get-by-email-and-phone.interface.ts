import { CheckAccountDto } from '../../dto/account/checkAccount.dto';
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ISsoServiceCheckByEmailPhoneResponse {
    status: number;
    message: string;
    data: CheckAccountDto | null;
    errors: { [key: string]: any };
}
