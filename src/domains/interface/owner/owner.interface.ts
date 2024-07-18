import { UUID } from 'crypto';
import { IBusiness } from '../business/business.interface';

export interface IOwner {
    id?: UUID;
    accountId?: UUID;
    businesses: IBusiness[];
    fio: string;
    imgUrl: string;
    active: boolean;
    email: string;
    phone: string;
}
