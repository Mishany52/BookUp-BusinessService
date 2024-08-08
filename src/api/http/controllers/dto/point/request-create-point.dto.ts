import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';
import { WorkTimeDto } from '@/common/dto/time/work-time.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RequestCreatePointDto {
    @ApiProperty({ description: 'The name of the point' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The address of the point' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'The postal index of the point' })
    @IsNumber()
    postIndex: number;

    @ApiProperty({
        description: 'The working time of the point in JSON format',
        example: {
            monday: { start: '10:00', end: '20:00' },
            tuesday: { start: '10:00', end: '20:00' },
            wednesday: { start: '10:00', end: '20:00' },
            thursday: { start: '10:00', end: '20:00' },
            friday: { start: '10:00', end: '20:00' },
            saturday: { start: '10:00', end: '20:00' },
            sunday: { start: '10:00', end: '20:00' },
        },
    })
    @IsObject()
    @Type(() => WorkTimeDto)
    weekWorkTime: WorkTimeDto;

    @ApiProperty({ description: 'Array of tag IDs associated with the point' })
    @IsNumber({}, { each: true })
    tagIds: number[];

    @ApiProperty({ description: 'The business ID to which the point belongs' })
    @IsNumber()
    businessId: number;

    @ApiProperty({ description: 'A description of the point', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'The website URL of the point', required: false })
    @IsUrl()
    @IsOptional()
    siteUrl?: string;

    @ApiProperty({ description: 'The logo URL of the point', required: false })
    @IsUrl()
    @IsOptional()
    logoUrl?: string;

    @ApiProperty({ description: 'Array of admin IDs associated with the point', required: false })
    @IsNumber({}, { each: true })
    @IsOptional()
    adminIds?: number[];

    @ApiProperty({
        description: 'Array of employee IDs associated with the point',
        required: false,
    })
    @IsNumber({}, { each: true })
    @IsOptional()
    employees?: number[];
}
