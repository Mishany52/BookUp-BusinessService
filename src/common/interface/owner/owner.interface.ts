import { UUID } from 'crypto';
import { IBusiness } from '../business/business.interface';

export interface IOwner {
    id?: number;
    accountId?: UUID;
    fio: string;
    email: string;
    phone: string;
    imgUrl?: string;
    active?: boolean;
    businesses?: IBusiness[];
}
