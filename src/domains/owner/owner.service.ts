import { CreateOwnerDto } from '@/api/http/controllers/dto/owner/create-owner.dto';
import { GetOwnerDto } from '@/api/http/controllers/dto/owner/get-owner.dto';
import { OwnerError } from '@/common/constants/http-messages/errors.constants';
import { IOwnerRepository } from '@/infrastructure/repository/owner/owner.repository.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { IOwner } from '../../common/interface/owner/owner.interface';
import { Providers } from '@/common/constants/providers.constants';
import { SsoCmd } from '@/common/constants/sso-microservice-cmd.constants';
import { UUID } from 'crypto';
import { ISSOServiceUpdateResponse } from '@/common/interface/sso/account/sso-service-update-response';
import { IAccount } from '@/common/interface/sso/account/account.interface';
import { ISSOServiceDeactivateResponse } from '@/common/interface/sso/account/sso-service-deactivate-by-id.interface';

const ownerRepo = () => Inject(Providers.OWNER_REPO);
const ssoService = () => Inject(Providers.SSO);

@Injectable()
export class OwnerService {
    constructor(
        @ownerRepo() private readonly _ownerRepository: IOwnerRepository,
        @ssoService() private readonly _ssoServiceClient: ClientProxy,
    ) {}

    async create(ownerDto: CreateOwnerDto): Promise<GetOwnerDto> {
        const newOwner = await this._ownerRepository.create(ownerDto);
        const getOwnerDto = new GetOwnerDto(newOwner);
        return getOwnerDto;
    }
    async update(ownerId: number, updateOwnerDto: Partial<UpdateOwnerDto>): Promise<GetOwnerDto> {
        const owner = await this.getOwnerById(ownerId);
        updateOwnerDto = await this._getUpdateFields(owner, updateOwnerDto);
        await this._updateAccount(owner.accountId, updateOwnerDto);
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
        const accountDeactivatedResponse: ISSOServiceDeactivateResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: SsoCmd.DEACTIVATE_ACCOUNT_BY_ID,
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

    private async _getUpdateFields(
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

    private async _updateAccount(
        accountId: UUID,
        updateFields: Partial<IAccount>,
    ): Promise<IAccount> {
        const ssoUpdateResponse: ISSOServiceUpdateResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: SsoCmd.UPDATE_ACCOUNT_BY_ID,
                },
                { id: accountId, ...updateFields },
            ),
        );
        if (ssoUpdateResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: ssoUpdateResponse.message,
                    errors: ssoUpdateResponse.errors,
                    data: null,
                },
                ssoUpdateResponse.status,
            );
        }
        return ssoUpdateResponse.data;
    }
}
