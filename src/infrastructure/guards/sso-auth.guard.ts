import { Providers } from '@/common/constants/providers.constants';
import { AuthServiceCmd } from '@/common/constants/auth-service-cmd.constants';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AccountRole } from '@/common/enums/account-role.enum';

const ssoService = () => Inject(Providers.SSO);

export class SSOAuthGuard implements CanActivate {
    constructor(
        @ssoService() private readonly _ssoService: ClientProxy,
        private readonly _reflector: Reflector,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this._reflector.getAllAndOverride<AccountRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            return false;
        }
        const { data: tokenPayload } = await firstValueFrom(
            this._ssoService.send({ cmd: AuthServiceCmd.VALIDATE_TOKEN }, { token }),
        );
        if (!tokenPayload) {
            return false;
        }
        request.user = {
            role: tokenPayload.role,
            accountId: tokenPayload.sub,
        };
        const hasRole = () => requiredRoles.some((role) => tokenPayload.role?.includes(role));
        return hasRole();
    }
}
