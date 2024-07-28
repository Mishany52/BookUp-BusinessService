import { CreateOwnerDto } from '@/api/http/controllers/dto/owner/create-owner.dto';
import { GetOwnerDto } from '@/api/http/controllers/dto/owner/get-owner.dto';
import { OwnerError } from '@/infrastructure/constants/http-messages/errors.constants';
import { IOwnerRepository } from '@/infrastructure/repository/owner/owner.repository.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { IServiceAccountDeactivateResponse } from '../interface/account/service-account-deactivate-by-id.interface';
import { firstValueFrom } from 'rxjs';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { IServiceAccountUpdateResponse } from '../interface/account/service-account-update-by-id.interface';
import { IOwner } from '../interface/owner/owner.interface';

const ownerRepo = () => Inject('ownerRepo');
const accountService = () => Inject('ssoService');

@Injectable()
export class OwnerService {
    constructor(
        @ownerRepo() private readonly _ownerRepository: IOwnerRepository,
        @accountService() private readonly _ssoServiceClient: ClientProxy,
    ) {}

    async create(ownerDto: CreateOwnerDto): Promise<GetOwnerDto> {
        const newOwner = await this._ownerRepository.create(ownerDto);
        const getOwnerDto = new GetOwnerDto(newOwner);
        return getOwnerDto;
    }
    async update(ownerId: UUID, updateOwnerDto: Partial<UpdateOwnerDto>): Promise<GetOwnerDto> {
        const owner = await this.getOwnerById(ownerId);
        updateOwnerDto = await this.getUpdateFields(owner, updateOwnerDto);
        const accountUpdateResponse: IServiceAccountUpdateResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: 'update_account_by_id',
                },
                { id: owner.accountId, ...updateOwnerDto },
            ),
        );
        if (accountUpdateResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: accountUpdateResponse.message,
                    errors: accountUpdateResponse.errors,
                    data: null,
                },
                accountUpdateResponse.status,
            );
        }
        Object.assign(owner, updateOwnerDto);
        const ownerUpdate = await this._ownerRepository.update(owner);
        if (!ownerUpdate) {
            throw new HttpException(OwnerError.OWNER_NOT_UPDATE, HttpStatus.BAD_REQUEST);
        }
        return new GetOwnerDto(owner);
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
            throw new HttpException(OwnerError.OWNER_NOT_UPDATE, HttpStatus.BAD_REQUEST);
        }
        return new GetOwnerDto(owner);
    }

    async getOwnerById(ownerId: UUID): Promise<GetOwnerDto> {
        const owner = await this._ownerRepository.getById(ownerId);
        if (!owner) {
            throw new HttpException(OwnerError.OWNER_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
        }
        return new GetOwnerDto(owner);
    }

    async getUpdateFields(
        owner: GetOwnerDto,
        updateOwnerDto: UpdateOwnerDto,
    ): Promise<Partial<IOwner>> {
        const updatedFields: Partial<IOwner> = {};

        //Проверка на наличие хотя бы одного поля с данными
        if (
            Object.keys(updateOwnerDto).length === 0 ||
            !Object.keys(updateOwnerDto).some((key) => updateOwnerDto[key] !== undefined)
        ) {
            throw new HttpException(OwnerError.OWNER_NOT_UPDATE, HttpStatus.BAD_REQUEST);
        }

        //Собираем объект из полей, которые имеют новые данные для обновления
        for (const key in updateOwnerDto) {
            if (
                Object.prototype.hasOwnProperty.call(updateOwnerDto, key) &&
                updateOwnerDto[key] !== owner[key]
            ) {
                updatedFields[key] = updateOwnerDto[key];
            }
        }
        return updatedFields;
    }
}
