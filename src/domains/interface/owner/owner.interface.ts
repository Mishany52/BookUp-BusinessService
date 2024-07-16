import { IBusiness } from '../business/business.interface';

export interface IOwner {
    id?: string;
    accountId?: string;
    businesses: IBusiness[];
    fio: string;
    imgUrl: string;
    archive: boolean;
    email: string;
    phone: string;
}
