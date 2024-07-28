import { UUID } from 'crypto';
import { IBusiness } from '../business/business.interface';
import { IPoint } from '../point/point.interface';

export interface IAdministrator {
    id: UUID;
    accountId: UUID;
    email: string;
    phone: string;
    fio: string;
    active: boolean;
    imgUrl: string;
    business: IBusiness;
    points: IPoint[];
}
