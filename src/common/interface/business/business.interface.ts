import { IAdministratorProps } from '../administrator/administrator.interface';
import { IOwnerProps } from '../owner/owner.interface';
import { IWorkTimeProps } from '../time/work-time.interface';

export interface IBusinessProps {
    id?: number;
    name: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTimeProps;
    owner: IOwnerProps;
    description?: string;
    siteUrl?: string;
    logoUrl?: string;
    administrators?: Array<IAdministratorProps>;
}
