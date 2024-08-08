import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IsNumber, IsObject, IsOptional, IsString, IsUrl } from 'class-validator';
import { GetAdminDto } from '../administrator/get-administrator.dto';
import { Type } from 'class-transformer';
import { IOwnerProps } from '@/common/interface/owner/owner.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { WorkTimeDto } from '@/common/dto/time/work-time.dto';

export class GetBusinessQueryDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsNumber()
    @IsOptional()
    postIndex?: number;

    @IsObject()
    @IsOptional()
    @Type(() => WorkTimeDto)
    weekWorkTime?: IWorkTimeProps;

    @IsObject()
    @IsOptional()
    @Type(() => GetAdminDto)
    owner?: IOwnerProps;

    @IsUrl()
    @IsOptional()
    siteUrl?: string;

    @IsUrl()
    @IsOptional()
    logoUrl?: string;

    @IsObject()
    @Type(() => GetAdminDto)
    @IsOptional()
    administrators?: IAdministratorProps[];
}
