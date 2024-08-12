import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IEmployeeProps } from '@/common/interface/employee/employee.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { ITagProps } from '@/common/interface/tag/tag.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { Type } from 'class-transformer';
import { GetAdminDto } from '../administrator/get-administrator.dto';
import { GetBusinessDto } from '../business/get-business.dto';
import { WorkTimeDto } from '@/common/dto/time/work-time.dto';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class GetPointDto implements IPointProps {
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

    @IsString()
    siteUrl: string;

    @IsString()
    logoUrl: string;

    @IsObject()
    @Type(() => GetBusinessDto)
    business: IBusinessProps;

    @IsObject()
    @Type(() => GetAdminDto)
    administrator: IAdministratorProps;

    employees: IEmployeeProps[];
    tags: ITagProps[];

    constructor(props: Partial<IPointProps>) {
        Object.assign(this, props);
    }
}
