import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestAdminDto } from '@/api/http/controllers/dto/administrator/request-admin.dto';
import { AdministratorService } from '@/domains/administrator/administrator.service';
import { ClientProxy } from '@nestjs/microservices';

const ssoService = () => Inject('ssoService');

@ApiTags('Administrator')
@Controller('administrator')
export class AdministratorController {
    constructor(
        private readonly _adminService: AdministratorService,
        @ssoService() private readonly _ssoServiceClient: ClientProxy,
    ) {}

    @ApiOperation({ summary: 'Создание администратора бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('createAdmin')
    async createAdmin(@Body() adminRequest: RequestAdminDto) {
        return await this._adminService.create(adminRequest);
    }
}
