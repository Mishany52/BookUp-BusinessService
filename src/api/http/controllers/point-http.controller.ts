import { PointService } from '@/domains/point/point.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetPointDto } from './dto/point/get-point.dto';
import { RequestCreatePointDto } from './dto/point/request-create-point.dto';

@ApiTags('Point')
@Controller('point')
export class PointHttpController {
    constructor(private readonly _pointService: PointService) {}

    @ApiOperation({ summary: 'Создание точки бизнеса' })
    @ApiCreatedResponse({ type: GetPointDto })
    @Post('create')
    async create(@Body() pointDto: RequestCreatePointDto): Promise<GetPointDto> {
        return this._pointService.create(pointDto);
    }
}
