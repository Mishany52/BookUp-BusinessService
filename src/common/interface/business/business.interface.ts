import { IAdministratorProps } from '../administrator/administrator.interface';
import { IOwnerProps } from '../owner/owner.interface';
import { IWorkTimeProps } from '../time/work-time.interface';

export interface IBusinessProps {
    id?: number;
    name: string;
    description: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTimeProps;
    owner: IOwnerProps;
    siteUrl?: string;
    logoUrl?: string;
    administrators?: Array<IAdministratorProps>;
}
