import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusinessService } from '@/domains/business/business.service';
import { CreateBusinessDto } from '@/api/http/controllers/dto/business/create-business.dto';
import { BusinessDomainEntity } from '@/domains/business/business.domain-entity';
import { GetBusinessDto } from './dto/business/get-business.dto';

@Controller('business')
@ApiTags('business')
export class BusinessHttpController {
    constructor(private readonly _businessService: BusinessService) {}

    @ApiOperation({ summary: 'Создание бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('create')
    async create(
        @Body() businessRequest: CreateBusinessDto,
    ): Promise<BusinessDomainEntity | undefined> {
        return await this._businessService.create(businessRequest);
    }

    @ApiOperation({ summary: 'Получение бизнеса по id владельца' })
    @ApiCreatedResponse({
        description: 'Business have been successfully created',
        type: GetBusinessDto,
    })
    @Get(':ownerId')
    public async getByOwnerId(
        @Param('ownerId') ownerId: number,
    ): Promise<GetBusinessDto[] | undefined> {
        return this._businessService.getByOwnerId(ownerId);
    }
}
