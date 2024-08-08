import { CheckAccountDto } from '@/common/dto/account/check-account.dto';
import { IAccount } from '@/common/interface/sso/account/account.interface';
import { UUID } from 'crypto';

export interface IAccountServicePort {
    checkByEmailAndPhone(email: string, phone: string): Promise<CheckAccountDto>;
    update(id: UUID, updateFields: Partial<IAccount>): Promise<IAccount>;
    deactivate(id: UUID): Promise<void>;
}
