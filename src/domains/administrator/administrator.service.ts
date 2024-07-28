import { GetAdminDto } from '@/api/http/controllers/dto/administrator/get-administrator';
import { IAdministratorRepository } from '@/infrastructure/repository/administrator/administrator.repository.interface';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountRole } from '../enums/account-role.enum';
import { firstValueFrom } from 'rxjs';
import { ISsoServiceCheckByEmailPhoneResponse } from '../interface/account/service-account-get-by-email-and-phone.interface';
import { CreateAdminDto } from '@/api/http/controllers/dto/administrator/create-admin.dto';
import { IServiceAccountUpdateResponse } from '../interface/account/service-account-update-by-id.interface';
import { AdminError } from '@/infrastructure/constants/http-messages/errors.constants';
import { IServiceAccountSingUpResponse } from '../interface/account/service-account-sing-up.interface';

const adminRepo = () => Inject('adminRepo');
const ssoService = () => Inject('ssoService');

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
                { cmd: 'check_account_by_email_and_phone' },
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
                        cmd: 'update_account_by_id',
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
                this._ssoServiceClient.send({ cmd: 'account_sing_up' }, adminRequest),
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
