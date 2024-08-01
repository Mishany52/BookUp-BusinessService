import { IBusinessDomainEntity } from '@/common/interface/business/business.domain-entity.interface';

export interface IBusinessRepository {
    create(createFields: Partial<IBusinessDomainEntity>): Promise<IBusinessDomainEntity>;
    getByAnyProperties(businessDto: Partial<IBusinessDomainEntity>): Promise<IBusinessDomainEntity>;
    getByOwnerId(ownerId: number): Promise<IBusinessDomainEntity[] | undefined>;
    // update(updateFields: IBusiness): Promise<IBusiness>;
    // getById(id: UUID): Promise<IBusiness>;
}
