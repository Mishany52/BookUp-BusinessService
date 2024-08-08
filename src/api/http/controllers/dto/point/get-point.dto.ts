import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IEmployeeProps } from '@/common/interface/employee/employee.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { ITagProps } from '@/common/interface/tag/tag.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { Expose, Type } from 'class-transformer';
import { GetAdminDto } from '../administrator/get-administrator.dto';
import { GetBusinessDto } from '../business/get-business.dto';
import { WorkTimeDto } from '@/common/dto/time/work-time.dto';

export class GetPointDto implements IPointProps {
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    description: string;
    @Expose()
    address: string;
    @Expose()
    postIndex: number;
    @Expose()
    @Type(() => WorkTimeDto)
    weekWorkTime: IWorkTimeProps;
    @Expose()
    siteUrl: string;
    @Expose()
    logoUrl: string;
    @Expose()
    @Type(() => GetBusinessDto)
    business: IBusinessProps;
    @Expose()
    @Type(() => GetAdminDto)
    administrator: IAdministratorProps;

    employees: IEmployeeProps[];
    tags: ITagProps[];

    constructor(props: Partial<IPointProps>) {
        Object.assign(this, props);
    }
}
