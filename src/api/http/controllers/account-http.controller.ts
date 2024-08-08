// import { AdministratorService } from '@/domains/administrator/administrator.service';
import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Providers } from '@/common/constants/providers.constants';
import { SSOAuthGuard } from '@/infrastructure/guards/sso-auth.guard';
import { AccountService } from '@/domains/account/account.service';
import { IRequestAccount } from '@/common/interface/account/request-account.interface';

const ssoService = () => Inject(Providers.SSO);

@ApiTags('Account')
@Controller('account')
export class AccountController {
    constructor(
        @ssoService() private readonly _ssoServiceClient: ClientProxy,
        private readonly _accountService: AccountService,
    ) {}

    @ApiOperation({ summary: 'получение информации о пользователе' })
    @ApiResponse({ status: 200 })
    @UseGuards(SSOAuthGuard)
    @Get('get-info')
    async getInfo(@Req() req: IRequestAccount) {
        return this._accountService.getInfo(req.user);
    }
}
