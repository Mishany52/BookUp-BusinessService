import { Providers } from '@/common/constants/providers.constants';
import { SsoCmd } from '@/common/constants/sso-microservice-cmd.constants';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const ssoService = () => Inject(Providers.SSO);

export class SSOAuthGuard implements CanActivate {
    constructor(@ssoService() private readonly _ssoService: ClientProxy) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        const { data: tokenPayload } = await firstValueFrom(
            this._ssoService.send({ cmd: SsoCmd.VALIDATE_TOKEN }, { token }),
        );
        if (!tokenPayload) {
            return false;
        }
        request.user = {
            role: tokenPayload.role,
            accountId: tokenPayload.sub,
        };
        return true;
    }
}
