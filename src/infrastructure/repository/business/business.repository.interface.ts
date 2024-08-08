import { IBusinessProps } from '@/common/interface/business/business.interface';
import { BusinessDomainEntity } from '@/domains/business/business.domain-entity';

export interface IBusinessRepository {
    create(createFields: BusinessDomainEntity): Promise<IBusinessProps>;
    getByAnyProperties(businessDto: Partial<IBusinessProps>): Promise<IBusinessProps>;
    getByOwnerId(ownerId: number): Promise<IBusinessProps[] | undefined>;
    // update(updateFields: IBusiness): Promise<IBusiness>;
    // getById(id: UUID): Promise<IBusiness>;
}
