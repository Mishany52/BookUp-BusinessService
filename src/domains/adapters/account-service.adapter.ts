import { AccountServiceCmd } from '@/common/constants/account-service-cmd.constant';
import { Providers } from '@/common/constants/providers.constants';
import { CheckAccountDto } from '@/common/dto/account/check-account.dto';
import { IAccount } from '@/common/interface/sso/account/account.interface';
import { ISsoServiceCheckByEmailPhoneResponse } from '@/common/interface/sso/account/sso-service-get-by-email-and-phone.interface';
import { IAccountServicePort } from '@/infrastructure/ports/account-service.port';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { firstValueFrom } from 'rxjs';
import { ISSOServiceUpdateResponse } from '@/common/interface/sso/account/sso-service-update-response';
import { ISSOServiceSingUpResponse } from '@/common/interface/sso/account/sso-service-sign-up-response';

const ssoService = () => Inject(Providers.SSO);
@Injectable()
export class AccountServiceAdapter implements IAccountServicePort {
    constructor(@ssoService() private readonly _ssoServiceClient: ClientProxy) {}

    async checkByEmailAndPhone(email: string, phone: string): Promise<CheckAccountDto> {
        const response: ISsoServiceCheckByEmailPhoneResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                { cmd: AccountServiceCmd.CHECK_ACCOUNT_BY_EMAIL_AND_PHONE },
                { email, phone },
            ),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(response.message, response.status);
        }

        return response.data;
    }
    async update(id: UUID, updateFields: Partial<IAccount>): Promise<IAccount> {
        const responseUpdate: ISSOServiceUpdateResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: AccountServiceCmd.UPDATE_ACCOUNT_BY_ID,
                },
                { id, ...updateFields },
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
        return responseUpdate.data;
    }
    async deactivate(id: UUID): Promise<void> {
        const response: ISSOServiceSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: AccountServiceCmd.DEACTIVATE_ACCOUNT_BY_ID,
                },
                id,
            ),
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
    }
}
