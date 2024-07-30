import { Injectable } from '@nestjs/common';
import { IBusinessRepository } from './business.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from './business.entity';
import { Repository } from 'typeorm';
import { IBusiness } from '@/common/interface/business/business.interface';
import { IBusinessDomainEntity } from '@/common/interface/business/business.domain-entity.interface';

@Injectable()
export class BusinessRepository implements IBusinessRepository {
    constructor(
        @InjectRepository(BusinessEntity)
        private readonly _businessRepository: Repository<BusinessEntity>,
    ) {}

    async create(createFields: IBusinessDomainEntity): Promise<IBusiness> {
        const business = this._businessRepository.create(createFields);
        return await this._businessRepository.save(business);
    }

    getByAnyProperties(
        businessDto: Partial<IBusinessDomainEntity>,
    ): Promise<IBusinessDomainEntity> {
        return this._businessRepository.findOne({ where: { ...businessDto } });
    }

    async getByOwnerId(ownerId: number): Promise<IBusinessDomainEntity[] | undefined> {
        const business = await this._businessRepository.find({
            where: { owner: { id: ownerId } },
            relations: ['owner'],
        });
        return business;
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
