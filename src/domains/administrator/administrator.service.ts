import { GetAdminDto } from '@/api/http/controllers/dto/administrator/get-administrator';
import { IAdministratorRepository } from '@/infrastructure/repository/administrator/administrator.repository.interface';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountRole } from '../../common/enums/account-role.enum';
import { firstValueFrom } from 'rxjs';
import { ISsoServiceCheckByEmailPhoneResponse } from '../../common/interface/account/service-account-get-by-email-and-phone.interface';
import { CreateAdminDto } from '@/api/http/controllers/dto/administrator/create-admin.dto';
import { IServiceAccountUpdateResponse } from '../../common/interface/account/service-account-update-by-id.interface';
import { AdminError } from '@/common/constants/http-messages/errors.constants';
import { IServiceAccountSingUpResponse } from '../../common/interface/account/service-account-sing-up.interface';
import { Providers } from '@/common/constants/providers.constants';
import { SsoCmd } from '@/common/constants/sso-microservice-cmd.constants';
import { UUID } from 'crypto';
import { CheckAccountDto } from '@/common/dto/account/check-account.dto';
import { IAccount } from '@/common/interface/account/account.interface';

const adminRepo = () => Inject(Providers.ADMIN_REPO);
const ssoService = () => Inject(Providers.SSO);

@Injectable()
export class AdministratorService {
    constructor(
        @adminRepo() private readonly _adminRepository: IAdministratorRepository,
        @ssoService() private readonly _ssoServiceClient: ClientProxy,
    ) {}

    async create(adminDto: CreateAdminDto): Promise<GetAdminDto> {
        const adminRequest = {
            ...adminDto,
            role: AccountRole.admin,
        };
        const checkAccount = await this._checkAccountByEmailAndPhone(
            adminDto.email,
            adminDto.phone,
        );

        if (checkAccount.account) {
            return this._createAdminByExistingAccount(checkAccount.account);
        }

        if (!checkAccount.emailTaken && !checkAccount.phoneTaken) {
            return this._createNewAdminAndAccount(adminRequest);
        }

        this._exceptionEmailOrPhoneBusy(checkAccount);

        throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private async _updateAccountRole(accountId: UUID): Promise<IServiceAccountUpdateResponse> {
        const responseUpdate = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: SsoCmd.UPDATE_ACCOUNT_BY_ID,
                },
                { id: accountId, role: AccountRole.admin },
            ),
        );

        if (responseUpdate.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: responseUpdate.message,
                    errors: responseUpdate.errors,
                    data: null,
                },
                responseUpdate.status,
            );
        }
        return responseUpdate;
    }

    private async _checkAccountByEmailAndPhone(
        email: string,
        phone: string,
    ): Promise<CheckAccountDto> {
        const response: ISsoServiceCheckByEmailPhoneResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                { cmd: SsoCmd.CHECK_ACCOUNT_BY_EMAIL_AND_PHONE },
                { email, phone },
            ),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(response.message, response.status);
        }

        return response.data;
    }

    private async _createAdminByExistingAccount(account: IAccount): Promise<GetAdminDto> {
        if (account.role === AccountRole.admin || account.role === AccountRole.owner) {
            throw new HttpException(
                AdminError.ADMIN_OR_OWNER_ALREADY_CREATED,
                HttpStatus.BAD_REQUEST,
            );
        }

        const accountUpdateResponse = await this._updateAccountRole(account.id);
        const createOwnerDto = new CreateAdminDto(accountUpdateResponse.data);

        try {
            return new GetAdminDto(await this._adminRepository.create(createOwnerDto));
        } catch (e) {
            throw new HttpException(AdminError.ADMIN_CREATION_FAILED, HttpStatus.BAD_REQUEST);
        }
    }

    private async _singUp(accountFields: IAccount): Promise<IAccount> {
        const response: IServiceAccountSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send({ cmd: SsoCmd.SING_UP }, accountFields),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: response.message,
                    errors: response.errors,
                    data: null,
                },
                response.status,
            );
        }
        return response.data;
    }

    private async _createNewAdminAndAccount(adminRequest: IAccount): Promise<GetAdminDto> {
        const account = await this._singUp(adminRequest);
        const createOwnerDto = new CreateAdminDto(account);

        try {
            return new GetAdminDto(await this._adminRepository.create(createOwnerDto));
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    private _exceptionEmailOrPhoneBusy(checkAccount: CheckAccountDto): void {
        if (checkAccount.emailTaken) {
            throw new HttpException(AdminError.EMAIL_IS_BUSY, HttpStatus.BAD_REQUEST);
        }

        if (checkAccount.phoneTaken) {
            throw new HttpException(AdminError.PHONE_IS_BUSY, HttpStatus.BAD_REQUEST);
        }
    }
}
