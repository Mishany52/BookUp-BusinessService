import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetTagDto } from './dto/tags/get-tag.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagService } from '@/domains/tag/tag.service';
import { CreateTagDto } from './dto/tags/create-tag.dto';

@ApiTags('Tag')
@Controller('tag')
export class TagHttpController {
    constructor(private readonly _tagService: TagService) {}

    @ApiOperation({ summary: 'Создание тега бизнеса' })
    @ApiCreatedResponse({ type: GetTagDto })
    @Post('create')
    async create(@Body() tagDto: CreateTagDto): Promise<GetTagDto> {
        return this._tagService.create(tagDto);
    }

    @ApiOperation({ summary: 'Получение тега бизнеса' })
    @ApiCreatedResponse({ type: GetTagDto })
    @Get(':id')
    async getById(@Param('id') id: number): Promise<GetTagDto> {
        return this._tagService.getById(id);
    }
}
