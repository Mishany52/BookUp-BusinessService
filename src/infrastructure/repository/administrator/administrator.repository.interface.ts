import { IAdministratorDomainEntity } from '@/common/interface/administrator/administrator.interface';

export interface IAdministratorRepository {
    create(createFields: Partial<IAdministratorDomainEntity>): Promise<IAdministratorDomainEntity>;
    update(adminUpdate: Partial<IAdministratorDomainEntity>): Promise<IAdministratorDomainEntity>;
    getById(adminId: number): Promise<IAdministratorDomainEntity>;
}
