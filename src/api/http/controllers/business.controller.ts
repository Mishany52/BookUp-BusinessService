import { AccountIdDto } from './dto/account/account-id.dto';
import { IServiceAccountSearchByAccountIdResponse } from '@/domains/interface/account/service-account-search-by-account-id-response.interface';
import { Controller, Get, HttpException, HttpStatus, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { GetAccountDto } from './dto/account/get-account.dto';

@Controller('business')
@ApiTags('business')
export class BusinessController {
    constructor(@Inject('ACCOUNT_SERVICE') private readonly _accountServiceClient: ClientProxy) {}

    @Get(':id')
    @ApiOkResponse({
        type: GetAccountDto,
    })
    public async getAccount(@Param() params: AccountIdDto): Promise<GetAccountDto> {
        const getAccountResponse: IServiceAccountSearchByAccountIdResponse = await firstValueFrom(
            this._accountServiceClient.send(
                { cmd: 'account_search_by_account_id' },
                { accountId: params.id },
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
