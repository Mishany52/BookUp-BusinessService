import { OwnerService } from '@/domains/owner/owner.service';
import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestOwnerDto } from '../../http/controllers/dto/owner/request-owner.dto';
import { IServiceAccountSingUpResponse } from '@/domains/interface/account/service-account-sing-up.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseCreatedOwnerDto } from '../../http/controllers/dto/owner/response-created-owner.dto';
import { AccountRole } from '@/domains/enums/account-role';
import { CreateOwnerDto } from '../../http/controllers/dto/owner/create-owner.dto';
import { UUID } from 'crypto';
import { GetOwnerDto } from '../../http/controllers/dto/owner/get-owner.dto';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';

const accountService = () => Inject('ACCOUNT_SERVICE');

@ApiTags('Owner')
@Controller('owner')
export class OwnerMicroserviceController {
    constructor(
        private readonly _ownerService: OwnerService,
        @accountService() private readonly _ssoServiceClient: ClientProxy,
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
    @Patch('deactivateOwner/:id')
    async delete(@Param('id', ParseUUIDPipe) ownerId: UUID): Promise<GetOwnerDto> {
        return this._ownerService.deactivate(ownerId);
    }

    @ApiOperation({ summary: 'Обновления данных владельца бизнеса' })
    @ApiResponse({ status: 200 })
    @Patch('updateOwner/:id')
    async update(
        @Param('id') ownerId: UUID,
        @Body() updateOwnerDto: UpdateOwnerDto,
    ): Promise<GetOwnerDto> {
        return this._ownerService.update(ownerId, updateOwnerDto);
    }
}
