import { UUID } from 'crypto';
import { IBusiness } from '../business/business.interface';

export interface IOwner {
    id?: UUID;
    accountId?: UUID;
    fio: string;
    email: string;
    phone: string;
    imgUrl?: string;
    active?: boolean;
    businesses?: IBusiness[];
}
