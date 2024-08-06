import { OwnerService } from '@/domains/owner/owner.service';
import { Body, Controller, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCreateOwnerDto } from './dto/owner/request-owner.dto';
import { AccountRole } from '@/common/enums/account-role.enum';
import { CreateOwnerDto } from './dto/owner/create-owner.dto';
import { GetOwnerDto } from './dto/owner/get-owner.dto';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { IAuthServicePort } from '@/infrastructure/ports/auth-service.port';
import { Providers } from '@/common/constants/providers.constants';
const authService = () => Inject(Providers.AUTH_SERVICE);
@ApiTags('Owner')
@Controller('owner')
export class OwnerHttpController {
    constructor(
        private readonly _ownerService: OwnerService,
        @authService() private readonly _authService: IAuthServicePort,
    ) {}

    @ApiOperation({ summary: 'Создание владельца бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('create')
    async create(@Body() ownerRequest: RequestCreateOwnerDto): Promise<CreateOwnerDto> {
        const ownerRequestWithRole = {
            ...ownerRequest,
            role: AccountRole.owner,
        };

        const account = await this._authService.singUp(ownerRequestWithRole);
        const createOwnerDto = new CreateOwnerDto(account);

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
