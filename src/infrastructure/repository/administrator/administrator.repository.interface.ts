import { IAdministratorDomainEntity } from '@/common/interface/administrator/administrator.interface';
import { UUID } from 'crypto';

export interface IAdministratorRepository {
    create(createFields: Partial<IAdministratorDomainEntity>): Promise<IAdministratorDomainEntity>;
    update(adminUpdate: Partial<IAdministratorDomainEntity>): Promise<IAdministratorDomainEntity>;
    getById(adminId: number): Promise<IAdministratorDomainEntity>;
    getByAccountId(accountId: UUID): Promise<IAdministratorDomainEntity>;
}
