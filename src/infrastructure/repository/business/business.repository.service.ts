import { Injectable } from '@nestjs/common';
import { IBusinessRepository } from './business.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from './business.entity';
import { Repository } from 'typeorm';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { BusinessDomainEntity } from '@/domains/business/business.domain-entity';

@Injectable()
export class BusinessRepository implements IBusinessRepository {
    constructor(
        @InjectRepository(BusinessEntity)
        private readonly _businessRepository: Repository<BusinessEntity>,
    ) {}

    async create(createFields: IBusinessProps): Promise<BusinessDomainEntity> {
        const business = this._businessRepository.create(createFields);
        const businessEntity = await this._businessRepository.save(business);
        return BusinessDomainEntity.create(businessEntity);
    }

    async getByAnyProperties(businessDto: Partial<IBusinessProps>): Promise<BusinessDomainEntity> {
        const business = await this._businessRepository.findOne({
            where: { ...businessDto },
            relations: { owner: true },
        });
        return BusinessDomainEntity.create(business);
    }

    async getByOwnerId(ownerId: number): Promise<BusinessDomainEntity[] | undefined> {
        const businesses = await this._businessRepository.find({
            where: { owner: { id: ownerId } },
            relations: { owner: true },
        });

        if (!businesses || businesses.length === 0) {
            return undefined;
        }

        return businesses.map((business) =>
            BusinessDomainEntity.create(business as IBusinessProps),
        );
    }
    // async update(ownerUpdate: UpdateOwnerDto): Promise<IOwner> {
    //     try {
    //         const owner = await this._ownerRepository.save(ownerUpdate);
    //         return owner;
    //     } catch (error) {
    //         throw new Error(OwnerError.OWNER_NOT_UPDATE);
    //     }
    // }
}
