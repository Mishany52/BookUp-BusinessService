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
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOwnerDto } from './dto/owner/create-owner.dto';
import { GetOwnerDto } from './dto/owner/get-owner.dto';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { Providers } from '@/common/constants/providers.constants';
import { SsoCmd } from '@/common/constants/sso-microservice-cmd.constants';
import { AccountRole } from '@/common/enums/account-role.enum';
import { ISSOServiceSingUpResponse } from '@/common/interface/sso/account/sso-service-sign-up-response';

const ssoService = () => Inject(Providers.SSO);

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
    async createOwner(@Body() ownerRequest: RequestOwnerDto): Promise<CreateOwnerDto> {
        const ownerRequestWithRole = {
            ...ownerRequest,
            role: AccountRole.owner,
        };

        const singUpAccountResponse: ISSOServiceSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send({ cmd: SsoCmd.SING_UP }, ownerRequestWithRole),
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
    async delete(@Param('id') ownerId: number): Promise<GetOwnerDto> {
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
