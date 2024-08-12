import { IEmployeeProps } from '../employee/employee.interface';
import { IWorkTimeProps } from '../time/work-time.interface';
import { ITagProps } from '../tag/tag.interface';
import { IBusinessProps } from '../business/business.interface';
import { IAdministratorProps } from '../administrator/administrator.interface';

export interface IPointProps {
    id?: number;
    name: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTimeProps;
    business: IBusinessProps;
    tags: ITagProps[];
    description?: string;
    siteUrl?: string;
    logoUrl?: string;
    administrator?: IAdministratorProps;
    employees?: IEmployeeProps[];
}
