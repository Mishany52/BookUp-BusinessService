import { IServiceAccountSearchByAccountIdResponse } from '@/domains/interface/account/service-account-search-by-account-id-response.interface';
import { Controller, Get, HttpException, HttpStatus, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { GetAccountDto } from '../../http/controllers/dto/account/get-account.dto';
import { UUID } from 'crypto';

const ssoService = () => Inject('SSO_SERVICE');

@Controller('business')
@ApiTags('business')
export class BusinessMicroserviceController {
    constructor(@ssoService() private readonly _ssoServiceClient: ClientProxy) {}

    @Get(':id')
    @ApiOkResponse({
        type: GetAccountDto,
    })
    public async getAccountById(@Param('id') id: UUID): Promise<GetAccountDto> {
        const getAccountResponse: IServiceAccountSearchByAccountIdResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                { cmd: 'account_search_by_account_id' },
                { accountId: id },
            ),
        );

        if (getAccountResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: getAccountResponse.message,
                    errors: getAccountResponse.errors,
                    data: null,
                },
                getAccountResponse.status,
            );
        }
        return {
            message: getAccountResponse.message,
            data: {
                account: getAccountResponse.account,
            },
            errors: null,
        };
    }
}
