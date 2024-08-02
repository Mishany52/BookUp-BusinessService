import { IBusinessProps } from '@/common/interface/business/business.interface';
import { BusinessDomainEntity } from '@/domains/business/business.domain-entity';

export interface IBusinessRepository {
    create(createFields: BusinessDomainEntity): Promise<BusinessDomainEntity>;
    getByAnyProperties(businessDto: Partial<IBusinessProps>): Promise<BusinessDomainEntity>;
    getByOwnerId(ownerId: number): Promise<BusinessDomainEntity[] | undefined>;
    // update(updateFields: IBusiness): Promise<IBusiness>;
    // getById(id: UUID): Promise<IBusiness>;
}
