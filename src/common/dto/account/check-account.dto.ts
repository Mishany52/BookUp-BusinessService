import { IAccount } from '@/common/interface/sso/account/account.interface';

export class CheckAccountDto {
    account: IAccount | null;
    emailTaken: boolean;
    phoneTaken: boolean;
    constructor(isEmail: boolean, isPhone: boolean, account: IAccount) {
        this.account = account;
        this.emailTaken = isEmail;
        this.phoneTaken = isPhone;
    }
}
