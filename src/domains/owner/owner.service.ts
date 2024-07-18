import { CreateOwnerDto } from '@/api/http/controllers/dto/owner/create-owner.dto';
import { GetOwnerDto } from '@/api/http/controllers/dto/owner/get-owner.dto';
import {
    OWNER_NOT_FOUND_BY_ID,
    OWNER_NOT_UPDATE,
} from '@/infrastructure/constants/http-messages/errors.constants';
import { IOwnerRepository } from '@/infrastructure/repository/owner/owner.repository.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { IServiceAccountDeactivateResponse } from '../interface/account/service-account-deactivate-by-id.interface';
import { firstValueFrom } from 'rxjs';

const ownerRepo = () => Inject('ownerRepo');
@Injectable()
export class OwnerService {
    constructor(
        @ownerRepo() private readonly _ownerRepository: IOwnerRepository,
        @Inject('ACCOUNT_SERVICE') private readonly _ssoServiceClient: ClientProxy,
    ) {}

    async create(ownerDto: CreateOwnerDto): Promise<GetOwnerDto> {
        const newOwner = await this._ownerRepository.create(ownerDto);
        const getOwnerDto = new GetOwnerDto(newOwner);
        return getOwnerDto;
    }

    async deactivate(ownerId: UUID): Promise<GetOwnerDto> {
        const owner = await this.getOwnerById(ownerId);

        Object.assign(owner, { active: false });
        const accountDeactivatedResponse: IServiceAccountDeactivateResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: 'deactivate_account_by_id',
                },
                owner.accountId,
            ),
        );
        if (accountDeactivatedResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: accountDeactivatedResponse.message,
                    errors: accountDeactivatedResponse.errors,
                    data: null,
                },
                accountDeactivatedResponse.status,
            );
        }
        const ownerUpdate = await this._ownerRepository.update(owner);
        if (!ownerUpdate) {
            throw new HttpException(OWNER_NOT_UPDATE, HttpStatus.BAD_REQUEST);
        }
        return new GetOwnerDto(owner);
    }

    async getOwnerById(ownerId: UUID): Promise<GetOwnerDto> {
        const owner = await this._ownerRepository.getById(ownerId);
        if (!owner) {
            throw new HttpException(OWNER_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
        }
        return new GetOwnerDto(owner);
    }
}
