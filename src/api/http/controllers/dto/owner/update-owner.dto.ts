import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateOwnerDto } from './create-owner.dto';
import { IsOptional, IsUrl } from 'class-validator';

export class UpdateOwnerDto extends PartialType(OmitType(CreateOwnerDto, ['accountId'] as const)) {
    @IsOptional()
    @IsUrl()
    @ApiProperty({ example: 'Пока не знаем 2' })
    imgUrl?: string;
}
