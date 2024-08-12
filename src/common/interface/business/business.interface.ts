import { IAdministratorProps } from '../administrator/administrator.interface';
import { IManagerProps } from '../manager/manager.interface';
import { IOwnerProps } from '../owner/owner.interface';
import { IPointProps } from '../point/point.interface';
import { ITagProps } from '../tag/tag.interface';
import { IWorkTimeProps } from '../time/work-time.interface';

export interface IBusinessProps {
    id?: number;
    name: string;
    address: string;
    weekWorkTime: IWorkTimeProps;
    owner: IOwnerProps;
    postIndex?: number;
    description?: string;
    siteUrl?: string;
    logoUrl?: string;
    administrators?: IAdministratorProps[];
    points?: IPointProps[];
    managers?: IManagerProps[];
    tags?: ITagProps[];
}
