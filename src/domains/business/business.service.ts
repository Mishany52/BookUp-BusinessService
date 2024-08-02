import { CreateBusinessDto } from '@/api/http/controllers/dto/business/create-business.dto';
import { IBusinessRepository } from '@/infrastructure/repository/business/business.repository.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { BusinessDomainEntity } from './business.domain-entity';
import { BusinessError } from '@/common/constants/http-messages/errors.constants';
import { Providers } from '../../common/constants/providers.constants';
import { GetBusinessDto } from '@/api/http/controllers/dto/business/get-business.dto';
import { IBusinessProps } from '@/common/interface/business/business.interface';

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
            const businessDomainEntity = BusinessDomainEntity.create({ ...businessDto, owner });
            const businessEntity = await this._businessRepository.create(businessDomainEntity);
            return BusinessDomainEntity.create(businessEntity);
        } catch (error) {
            throw new HttpException(BusinessError.BUSINESS_NOT_CREATED, HttpStatus.BAD_REQUEST);
        }
    }

    async getByOwnerId(ownerId: number): Promise<GetBusinessDto[]> {
        try {
            const businessEntities = await this._businessRepository.getByOwnerId(ownerId);
            return businessEntities.map((business) => business.getDto());
        } catch (e) {
            throw new HttpException(BusinessError.BUSINESS_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    async getById(businessId: number): Promise<IBusinessProps> {
        try {
            return this._businessRepository.getByOwnerId(ownerId);
        } catch (e) {
            throw new HttpException(BusinessError.BUSINESS_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
