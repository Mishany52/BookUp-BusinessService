import { CreateBusinessDto } from '@/api/http/controllers/dto/business/create-business.dto';
import { IBusinessRepository } from '@/infrastructure/repository/business/business.repository.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { BusinessDomainEntity } from './business.domain-entity';
import { BusinessError } from '@/infrastructure/constants/http-messages/errors.constants';
import { objectKeysInString } from '@/utils/object-keys-in-string';
import { UUID } from 'crypto';
import { IBusinessDomainEntity } from '../interface/business/business.domain-entity.interface';

const businessRepo = () => Inject('businessRepo');
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
            const fieldsAsString = await objectKeysInString(requiredUniqueFields);

            throw new HttpException(
                `${BusinessError.BUSINESS_ALREADY_CREATED} with these fields: ${fieldsAsString}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        try {
            const owner = await this._ownerService.getOwnerById(businessDto.ownerId);
            const businessDomainEntity = new BusinessDomainEntity({ ...businessDto, owner });
            return this._businessRepository.create(businessDomainEntity);
        } catch (error) {
            throw new HttpException("Business hasn't been created", HttpStatus.BAD_REQUEST);
        }
    }

    async getByOwnerId(ownerId: UUID): Promise<IBusinessDomainEntity[]> {
        try {
            return this._businessRepository.getByOwnerId(ownerId);
        } catch (e) {
            throw new HttpException(BusinessError.BUSINESS_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
