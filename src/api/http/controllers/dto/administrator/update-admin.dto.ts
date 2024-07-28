import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsOptional, IsUrl } from 'class-validator';

export class UpdateAdminDto extends PartialType(OmitType(CreateAdminDto, ['accountId'] as const)) {
    @IsOptional()
    @IsUrl()
    @ApiProperty({ example: 'Пока не знаем 2' })
    imgUrl?: string;
}
