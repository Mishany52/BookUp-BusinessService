import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { AdministratorDomainEntity } from '@/domains/administrator/administrator.domain-entity';

export interface IAdministratorRepository {
    create(createFields: AdministratorDomainEntity): Promise<AdministratorDomainEntity>;
    update(adminUpdate: Partial<IAdministratorProps>): Promise<AdministratorDomainEntity>;
    getById(adminId: number): Promise<AdministratorDomainEntity>;
}
