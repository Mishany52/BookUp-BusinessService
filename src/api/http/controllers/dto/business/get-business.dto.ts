import { IBusinessProps } from '@/common/interface/business/business.interface';
import { CreateBusinessDto } from './create-business.dto';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IOwnerProps } from '@/common/interface/owner/owner.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { IsNumber, IsObject, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { GetAdminDto } from '../administrator/get-administrator.dto';
import { WorkTimeDto } from '@/common/dto/time/work-time.dto';

export class GetBusinessDto implements IBusinessProps {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    address: string;

    @IsNumber()
    postIndex: number;

    @IsObject()
    @Type(() => WorkTimeDto)
    weekWorkTime: IWorkTimeProps;

    @IsObject()
    @Type(() => GetAdminDto)
    owner: IOwnerProps;

    @IsUrl()
    siteUrl?: string;

    @IsUrl()
    logoUrl?: string;

    @IsObject()
    @Type(() => GetAdminDto)
    administrators?: IAdministratorProps[];
    constructor(props: IBusinessProps) {
        this.id = props.id;
        this.name = props.name;
        this.address = props.address;
        this.description = props.description;
        this.logoUrl = props.logoUrl || null;
        this.siteUrl = props.siteUrl || null;
        this.weekWorkTime = props.weekWorkTime;
        this.owner = props.owner;
        this.postIndex = props.postIndex;
    }
}
