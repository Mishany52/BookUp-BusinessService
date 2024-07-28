import { IAdministrator } from '@/domains/interface/administrator/administrator.interface';
import { IBusiness } from '@/domains/interface/business/business.interface';

import { UUID } from 'crypto';
import { IEmployee } from '../employee/employee.interface';
import { IWorkTime } from '../time/workTime.interface';

export interface IPoint {
    id: UUID;
    name: string;
    description: string;
    address: string;
    postIdex: number;
    weekWorkTime: IWorkTime;
    siteUrl: string;
    logoUrl: string;
    business: IBusiness;
    administrator: IAdministrator;
    employees: IEmployee[];
    categoryId: number;
    subCategoryId: number;
}
