import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { BusinessService } from '@/domains/business/business.service';
import { CreateBusinessDto } from '@/api/http/controllers/dto/business/create-business.dto';
import { BusinessDomainEntity } from '@/domains/business/business.domain-entity';

const ssoService = () => Inject('ssoService');

@Controller('business')
@ApiTags('business')
export class BusinessMicroserviceController {
    constructor(
        @ssoService() private readonly _accountServiceClient: ClientProxy,
        private readonly _businessService: BusinessService,
    ) {}

    @ApiOperation({ summary: 'Создание бизнеса' })
    @ApiResponse({ status: 200 })
    @Post('createBusiness')
    async createAdmin(@Body() businessRequest: CreateBusinessDto) {
        return await this._businessService.create(businessRequest);
    }
    @Get(':ownerId')
    public async getByOwnerId(
        @Param('ownerId') ownerId: UUID,
    ): Promise<BusinessDomainEntity[] | undefined> {
        return this._businessService.getByOwnerId(ownerId);
    }
}
