import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusinessService } from '@/domains/business/business.service';
import { CreateBusinessDto } from '@/api/http/controllers/dto/business/create-business.dto';
import { BusinessDomainEntity } from '@/domains/business/business.domain-entity';
import { GetBusinessDto } from './dto/business/get-business.dto';
import { GetBusinessQueryDto } from './dto/business/get-business-query.dto';

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
    @Get('by-owner-id')
    async getByOwnerId(
        @Query('ownerId', ParseIntPipe) ownerId: number,
    ): Promise<GetBusinessDto[] | undefined> {
        return this._businessService.getByOwnerId(ownerId);
    }

    @Get('by-properties')
    async getByAnyProperties(@Query() query: GetBusinessQueryDto) {
        return this._businessService.getByAnyProperties(query);
    }
}
