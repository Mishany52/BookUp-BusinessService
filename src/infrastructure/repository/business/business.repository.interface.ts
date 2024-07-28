import { IBusinessDomainEntity } from '@/domains/interface/business/business.domain-entity.interface';
import { UUID } from 'crypto';

export interface IBusinessRepository {
    create(createFields: Partial<IBusinessDomainEntity>): Promise<IBusinessDomainEntity>;
    getByAnyProperties(businessDto: Partial<IBusinessDomainEntity>): Promise<IBusinessDomainEntity>;
    getByOwnerId(ownerId: UUID): Promise<IBusinessDomainEntity[] | undefined>;
    // update(updateFields: IBusiness): Promise<IBusiness>;
    // getById(id: UUID): Promise<IBusiness>;
}
