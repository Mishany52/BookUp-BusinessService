import { IOwner } from '../owner/owner.interface';
import { IAdministrator } from '../administrator/administrator.interface';
import { IWorkTime } from '../time/workTime.interface';

export interface IBusiness {
    id: number;
    name: string;
    description: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTime;
    siteUrl: string;
    logoUrl: string;
    owner: IOwner;
    administrator: IAdministrator[];
}
