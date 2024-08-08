import { WorkTimeDto } from '@/common/dto/time/work-time.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

export class CreateBusinessDto {
    @ApiProperty({
        description: 'The name of the business',
        example: 'My Business',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The address of the business',
        example: '123 Main Street, City, Country',
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'The postal index of the business',
        example: 12345,
    })
    @IsNumber()
    postIndex: number;

    @ApiProperty({
        description: 'The working time of the business in JSON format',
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
    @ValidateNested()
    @Type(() => WorkTimeDto)
    weekWorkTime: WorkTimeDto;

    @ApiProperty({
        description: 'The UUID of the owner',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNumber()
    ownerId: number;

    @ApiProperty({
        description: 'The website URL of the business',
        required: false,
        example: 'https://www.mybusiness.com',
    })
    @IsOptional()
    @IsUrl()
    siteUrl?: string;

    @ApiProperty({
        description: 'The description of the business',
        example: 'This is a great business that offers excellent services.',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'The logo URL of the business',
        required: false,
        example: 'https://www.mybusiness.com/logo.png',
    })
    @IsOptional()
    @IsUrl()
    logoUrl?: string;
}
