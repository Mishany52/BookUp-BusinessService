import { IEmployeeProps } from '../employee/employee.interface';
import { IWorkTimeProps } from '../time/work-time.interface';
import { ITagProps } from '../tag/tag.interface';
import { IBusinessProps } from '../business/business.interface';
import { IAdministratorProps } from '../administrator/administrator.interface';

export interface IPointProps {
    id: number;
    name: string;
    description: string;
    address: string;
    postIdex: number;
    weekWorkTime: IWorkTimeProps;
    siteUrl: string;
    logoUrl: string;
    business: IBusinessProps;
    administrator: IAdministratorProps;
    employees: IEmployeeProps[];
    tags: ITagProps[];
}
