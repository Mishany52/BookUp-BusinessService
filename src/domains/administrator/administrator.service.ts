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
        const checkAccount: ISsoServiceCheckByEmailPhoneResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                { cmd: SsoCmd.CHECK_ACCOUNT_BY_EMAIL_AND_PHONE },
                { email: adminRequest.email, phone: adminRequest.phone },
            ),
        );

        if (checkAccount.status !== HttpStatus.OK) {
            throw new HttpException(checkAccount.message, checkAccount.status);
        }
        const account = checkAccount.data.account;
        if (account) {
            if (account.role === AccountRole.admin || account.role === AccountRole.owner)
                throw new HttpException(
                    AdminError.ADMIN_OR_OWNER_ALREADY_CREATED,
                    HttpStatus.BAD_REQUEST,
                );

            const accountUpdateResponse: IServiceAccountUpdateResponse = await firstValueFrom(
                this._ssoServiceClient.send(
                    {
                        cmd: SsoCmd.UPDATE_ACCOUNT_BY_ID,
                    },
                    { id: account.id, role: AccountRole.admin },
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

            const createOwnerDto = new CreateAdminDto(accountUpdateResponse.data);

            try {
                return new GetAdminDto(await this._adminRepository.create(createOwnerDto));
            } catch (e) {
                throw new HttpException(e.massages, HttpStatus.BAD_REQUEST);
            }
        }

        if (!checkAccount.data.emailTaken && !checkAccount.data.phoneTaken) {
            const singUpAccountResponse: IServiceAccountSingUpResponse = await firstValueFrom(
                this._ssoServiceClient.send({ cmd: SsoCmd.SING_UP }, adminRequest),
            );

            if (singUpAccountResponse.status !== HttpStatus.OK) {
                throw new HttpException(
                    {
                        message: singUpAccountResponse.message,
                        errors: singUpAccountResponse.errors,
                        data: null,
                    },
                    singUpAccountResponse.status,
                );
            }

            const createOwnerDto = new CreateAdminDto(singUpAccountResponse.data);

            try {
                return new GetAdminDto(await this._adminRepository.create(createOwnerDto));
            } catch (e) {
                throw new HttpException(e.massages, HttpStatus.BAD_REQUEST);
            }
        }

        if (checkAccount.data.emailTaken) {
            throw new HttpException(AdminError.EMAIL_IS_BUSY, HttpStatus.BAD_REQUEST);
        }
        if (checkAccount.data.phoneTaken) {
            throw new HttpException(AdminError.PHONE_IS_BUSY, HttpStatus.BAD_REQUEST);
        }

        throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
