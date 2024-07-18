import { OwnerService } from '@/domains/owner/owner.service';
import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestOwnerDto } from './dto/owner/request-owner.dto';
import { IServiceAccountSingUpResponse } from '@/domains/interface/account/service-account-sing-up.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseCreatedOwnerDto } from './dto/owner/response-created-owner.dto';
import { AccountRole } from '@/domains/enums/account-role';
import { CreateOwnerDto } from './dto/owner/create-owner.dto';
import { UUID } from 'crypto';
import { GetOwnerDto } from './dto/owner/get-owner.dto';

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
        const ownerRequestWithRole = {
            ...ownerRequest,
            role: AccountRole.owner,
        };

        const singUpAccountResponse: IServiceAccountSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send({ cmd: 'account_sing_up' }, ownerRequestWithRole),
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
        const createOwnerDto = new CreateOwnerDto(singUpAccountResponse.data);

        await this._ownerService.create(createOwnerDto);

        return new ResponseCreatedOwnerDto({ ...singUpAccountResponse.data });
    }

    @ApiOperation({ summary: 'Деактивация владельца бизнеса' })
    @ApiResponse({ status: 200 })
    @Put('deactivateOwner/:id')
    async delete(@Param('id', ParseUUIDPipe) ownerId: UUID): Promise<GetOwnerDto> {
        return this._ownerService.deactivate(ownerId);
    }
}
