import { SignUpDto } from '@/api/http/controllers/dto/auth/sing-up.dto';
import { AuthServiceCmd } from '@/common/constants/auth-service-cmd.constants';
import { Providers } from '@/common/constants/providers.constants';
import { IAccount } from '@/common/interface/account/account.interface';
import { IServiceAccountSingUpResponse } from '@/common/interface/account/service-account-sing-up.interface';
import { IAuthServicePort } from '@/infrastructure/ports/auth-service.port';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const ssoService = () => Inject(Providers.SSO);

@Injectable()
export class AuthServiceAdapter implements IAuthServicePort {
    constructor(@ssoService() private readonly _ssoServiceClient: ClientProxy) {}

    async singUp(singUpDto: SignUpDto): Promise<IAccount> {
        const singUpAccountResponse: IServiceAccountSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send({ cmd: AuthServiceCmd.SING_UP }, singUpDto),
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
        return singUpAccountResponse.data;
    }
}
