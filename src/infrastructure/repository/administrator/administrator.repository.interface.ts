import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { AdministratorDomainEntity } from '@/domains/administrator/administrator.domain-entity';

export interface IAdministratorRepository {
    create(createFields: AdministratorDomainEntity): Promise<IAdministratorProps>;
    update(adminUpdate: Partial<IAdministratorProps>): Promise<IAdministratorProps>;
    getById(adminId: number): Promise<IAdministratorProps>;
}
