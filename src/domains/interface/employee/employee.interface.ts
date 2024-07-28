import { UUID } from 'crypto';
import { IBusiness } from '../business/business.interface';
import { IPoint } from '../point/point.interface';

export interface IEmployee {
    id?: UUID;
    accountId?: UUID;
    fio: string;
    email: string;
    phone: string;
    imgUrl?: string;
    active?: boolean;
    points: IPoint[];
    business: IBusiness;
}
