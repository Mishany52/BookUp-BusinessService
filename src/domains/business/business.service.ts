import { CreateBusinessDto } from '@/api/http/controllers/dto/business/create-business.dto';
import { IBusinessRepository } from '@/infrastructure/repository/business/business.repository.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { BusinessDomainEntity } from './business.domain-entity';
import { BusinessError } from '@/common/constants/http-messages/errors.constants';
import { IBusinessDomainEntity } from '../../common/interface/business/business.domain-entity.interface';
import { Providers } from '../../common/constants/providers.constants';

const businessRepo = () => Inject(Providers.BUSINESS_REPO);
@Injectable()
export class BusinessService {
    constructor(
        @businessRepo() private readonly _businessRepository: IBusinessRepository,
        private readonly _ownerService: OwnerService,
    ) {}

    async create(businessDto: CreateBusinessDto): Promise<BusinessDomainEntity> {
        const requiredUniqueFields = {
            name: businessDto.name,
            description: businessDto.description,
        };
        const business = await this._businessRepository.getByAnyProperties(requiredUniqueFields);
        if (business) {
            throw new HttpException(
                `${BusinessError.BUSINESS_ALREADY_CREATED} with these fields: ${JSON.stringify(requiredUniqueFields)}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        try {
            const owner = await this._ownerService.getOwnerById(businessDto.ownerId);
            const businessDomainEntity = new BusinessDomainEntity({ ...businessDto, owner });
            return this._businessRepository.create(businessDomainEntity);
        } catch (error) {
            throw new HttpException(BusinessError.BUSINESS_NOT_CREATED, HttpStatus.BAD_REQUEST);
        }
    }

    async getByOwnerId(ownerId: number): Promise<IBusinessDomainEntity[]> {
        try {
            return this._businessRepository.getByOwnerId(ownerId);
        } catch (e) {
            throw new HttpException(BusinessError.BUSINESS_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
