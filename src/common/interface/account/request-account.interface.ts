import { AccountRole } from '@/common/enums/account-role.enum';
import { UUID } from 'crypto';

export interface IRequestAccount {
    user: {
        role: AccountRole;
        accountId: UUID;
    };
}
