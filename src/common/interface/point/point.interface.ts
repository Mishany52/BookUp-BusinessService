import { IAdministratorDomainEntity } from '@/common/interface/administrator/administrator.interface';
import { IBusiness } from '@/common/interface/business/business.interface';

import { IEmployee } from '../employee/employee.interface';
import { IWorkTime } from '../time/workTime.interface';
import { ITag } from '../tag/tag.interface';

export interface IPoint {
    id: number;
    name: string;
    description: string;
    address: string;
    postIdex: number;
    weekWorkTime: IWorkTime;
    siteUrl: string;
    logoUrl: string;
    business: IBusiness;
    administrator: IAdministratorDomainEntity;
    employees: IEmployee[];
    tags: ITag[];
}
