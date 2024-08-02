import { AccountRole } from '@/common/enums/account-role.enum';
import { Expose } from 'class-transformer';

export class AccountGetInfoDto {
    @Expose()
    id: number;
    @Expose()
    role: AccountRole;
    @Expose()
    active: boolean;
}
