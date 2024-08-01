import { OwnerService } from '@/domains/owner/owner.service';
import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestOwnerDto } from './dto/owner/request-owner.dto';
<<<<<<<< HEAD:src/api/http/controllers/owner-microservice.controller.ts
import { IServiceAccountSingUpResponse } from '@/domains/interface/account/service-account-sing-up.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseCreatedOwnerDto } from './dto/owner/response-created-owner.dto';
import { AccountRole } from '@/domains/enums/account-role';
import { CreateOwnerDto } from './dto/owner/create-owner.dto';
import { UUID } from 'crypto';
========
import { IServiceAccountSingUpResponse } from '@/common/interface/account/service-account-sing-up.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { AccountRole } from '@/common/enums/account-role.enum';
import { CreateOwnerDto } from './dto/owner/create-owner.dto';
>>>>>>>> develop:src/api/http/controllers/owner-http.controller.ts
import { GetOwnerDto } from './dto/owner/get-owner.dto';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { Providers } from '@/common/constants/providers.constants';
import { SsoCmd } from '@/common/constants/sso-microservice-cmd.constants';

<<<<<<<< HEAD:src/api/http/controllers/owner-microservice.controller.ts
const ssoService = () => Inject('SSO_SERVICE');
========
const ssoService = () => Inject(Providers.SSO);
>>>>>>>> develop:src/api/http/controllers/owner-http.controller.ts

@ApiTags('Owner')
@Controller('owner')
export class OwnerHttpController {
    constructor(
        private readonly _ownerService: OwnerService,
        @ssoService() private readonly _ssoServiceClient: ClientProxy,
    ) {}

    @ApiOperation({ summary: 'Создание владельца бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('create')
<<<<<<<< HEAD:src/api/http/controllers/owner-microservice.controller.ts
    async createOwner(@Body() ownerRequest: RequestOwnerDto): Promise<ResponseCreatedOwnerDto> {
========
    async createOwner(@Body() ownerRequest: RequestOwnerDto): Promise<CreateOwnerDto> {
>>>>>>>> develop:src/api/http/controllers/owner-http.controller.ts
        const ownerRequestWithRole = {
            ...ownerRequest,
            role: AccountRole.owner,
        };

        const singUpAccountResponse: IServiceAccountSingUpResponse = await firstValueFrom(
<<<<<<<< HEAD:src/api/http/controllers/owner-microservice.controller.ts
            this._ssoServiceClient.send({ cmd: 'auth_sing_up' }, ownerRequestWithRole),
========
            this._ssoServiceClient.send({ cmd: SsoCmd.SING_UP }, ownerRequestWithRole),
>>>>>>>> develop:src/api/http/controllers/owner-http.controller.ts
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

        return this._ownerService.create(createOwnerDto);
    }

    @ApiOperation({ summary: 'Деактивация владельца бизнеса' })
    @ApiResponse({ status: 200 })
    @Patch('deactivate/:id')
<<<<<<<< HEAD:src/api/http/controllers/owner-microservice.controller.ts
    async delete(@Param('id', ParseUUIDPipe) ownerId: UUID): Promise<GetOwnerDto> {
========
    async delete(@Param('id') ownerId: number): Promise<GetOwnerDto> {
>>>>>>>> develop:src/api/http/controllers/owner-http.controller.ts
        return this._ownerService.deactivate(ownerId);
    }

    @ApiOperation({ summary: 'Обновления данных владельца бизнеса' })
    @ApiResponse({ status: 200 })
    @Patch('update/:id')
    async update(
        @Param('id') ownerId: number,
        @Body() updateOwnerDto: UpdateOwnerDto,
    ): Promise<GetOwnerDto> {
        return this._ownerService.update(ownerId, updateOwnerDto);
    }
}
