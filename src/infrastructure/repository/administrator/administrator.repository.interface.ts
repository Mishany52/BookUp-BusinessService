import { IAdministrator } from '@/domains/interface/administrator/administrator.interface';
import { UUID } from 'crypto';

export interface IAdministratorRepository {
    create(createFields: Partial<IAdministrator>): Promise<IAdministrator>;
    update(adminUpdate: Partial<IAdministrator>): Promise<IAdministrator>;
    getById(adminId: UUID): Promise<IAdministrator>;
}
