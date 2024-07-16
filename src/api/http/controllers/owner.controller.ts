import { OwnerService } from '@/domains/interface/owner/owner.service';
import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestOwnerDto } from './dto/request-owner.dto';
import { IServiceAccountSingUpResponse } from '@/domains/interface/account/service-account-sing-up.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseCreatedOwnerDto } from './dto/response-created-owner.dto';
import { AccountRole } from '@/domains/enums/account-role';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
    constructor(
        private readonly _ownerService: OwnerService,
        @Inject('ACCOUNT_SERVICE') private readonly _ssoServiceClient: ClientProxy,
    ) {}

    @ApiOperation({ summary: 'Создание владельца бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('createOwner')
    async createOwner(@Body() ownerRequest: RequestOwnerDto): Promise<ResponseCreatedOwnerDto> {
        const singUpAccountResponse: IServiceAccountSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                { cmd: 'account_sing_up' },
                Object.assign(ownerRequest, { role: AccountRole.owner }),
            ),
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
        const createOwnerDto = Object.assign(ownerRequest, {
            accountId: singUpAccountResponse.account.id,
        });
        const test = await this._ownerService.create(createOwnerDto);
        console.log(test);
        return new ResponseCreatedOwnerDto({ ...singUpAccountResponse.account });
    }
}
