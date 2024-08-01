/* eslint-disable @typescript-eslint/no-explicit-any */

import { CheckAccountDto } from '@/common/dto/account/check-account.dto';

export interface ISSOServiceCheckByEmailPhoneResponse {
    status: number;
    message: string;
    data: CheckAccountDto | null;
    errors: { [key: string]: any };
}
