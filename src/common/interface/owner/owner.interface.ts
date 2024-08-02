import { UUID } from 'crypto';
import { IBusinessProps } from '../business/business.interface';

export interface IOwnerProps {
    id?: number;
    accountId?: UUID;
    fio: string;
    email: string;
    phone: string;
    imgUrl?: string;
    active?: boolean;
    businesses?: IBusinessProps[];
}
