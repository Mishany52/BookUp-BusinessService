import { CreateOwnerDto } from '@/api/http/controllers/dto/owner/create-owner.dto';
import { GetOwnerDto } from '@/api/http/controllers/dto/owner/get-owner.dto';
import { OwnerError } from '@/common/constants/http-messages/errors.constants';
import { IOwnerRepository } from '@/infrastructure/repository/owner/owner.repository.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { Providers } from '@/common/constants/providers.constants';
import { getUpdateFields } from '@/common/utils/get-update-fields';
import { IAccountServicePort } from '@/infrastructure/ports/account-service.port';
import { UUID } from 'crypto';

const ownerRepo = () => Inject(Providers.OWNER_REPO);
const accountService = () => Inject(Providers.ACCOUNT_SERVICE);

@Injectable()
export class OwnerService {
    constructor(
        @ownerRepo() private readonly _ownerRepository: IOwnerRepository,
        @accountService() private readonly _accountService: IAccountServicePort,
    ) {}

    async create(ownerDto: CreateOwnerDto): Promise<GetOwnerDto> {
        const newOwner = await this._ownerRepository.create(ownerDto);
        const getOwnerDto = new GetOwnerDto(newOwner);
        return getOwnerDto;
    }
    async update(ownerId: number, updateOwnerDto: Partial<UpdateOwnerDto>): Promise<GetOwnerDto> {
        const owner = await this.getOwnerById(ownerId);
        updateOwnerDto = await getUpdateFields(owner, updateOwnerDto);
        await this._accountService.update(owner.accountId, updateOwnerDto);
        Object.assign(owner, updateOwnerDto);
        try {
            const ownerUpdate = await this._ownerRepository.update(owner);
            return new GetOwnerDto(ownerUpdate);
        } catch (e) {
            throw new HttpException(OwnerError.OWNER_NOT_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deactivate(ownerId: number): Promise<GetOwnerDto> {
        const owner = await this.getOwnerById(ownerId);
        Object.assign(owner, { active: false });
        await this._accountService.deactivate(owner.accountId);
        const ownerUpdate = await this._ownerRepository.update(owner);
        if (!ownerUpdate) {
            throw new HttpException(OwnerError.OWNER_NOT_UPDATE, HttpStatus.BAD_REQUEST);
        }
        return new GetOwnerDto(owner);
    }

    async getOwnerById(ownerId: number): Promise<GetOwnerDto> {
        const owner = await this._ownerRepository.getById(ownerId);
        if (!owner) {
            throw new HttpException(OwnerError.OWNER_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
        }
        return new GetOwnerDto(owner);
    }

    async getOwnerByAccountId(accountId: UUID): Promise<GetOwnerDto> {
        const owner = await this._ownerRepository.getByAccountId(accountId);
        if (!owner) {
            throw new HttpException(OwnerError.OWNER_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
        }
        return new GetOwnerDto(owner);
    }
}
