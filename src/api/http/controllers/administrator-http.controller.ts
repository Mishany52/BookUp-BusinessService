import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdministratorService } from '@/domains/administrator/administrator.service';
import { RequestCreateAdminDto } from './dto/administrator/request-admin.dto';
import { GetAdminDto } from './dto/administrator/get-administrator.dto';
import { UpdateAdminDto } from './dto/administrator/update-admin.dto';

@ApiTags('Administrator')
@Controller('administrator')
export class AdministratorController {
    constructor(private readonly _adminService: AdministratorService) {}

    @ApiOperation({ summary: 'Создание администратора бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('create')
    async create(@Body() adminRequest: RequestCreateAdminDto): Promise<GetAdminDto> {
        return await this._adminService.create(adminRequest);
    }

    @ApiOperation({ summary: 'Создание администратора бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('deactivate/:id')
    async deactivate(@Param('id') id: number): Promise<GetAdminDto> {
        return await this._adminService.deactivate(id);
    }

    @ApiOperation({ summary: 'Обновление администратора бизнеса' })
    @ApiCreatedResponse({
        status: 200,
        type: GetAdminDto,
    })
    @Post('update/:id')
    async update(@Param('id') id: number, @Body() updateDto: UpdateAdminDto): Promise<GetAdminDto> {
        return await this._adminService.update(id, updateDto);
    }
}
