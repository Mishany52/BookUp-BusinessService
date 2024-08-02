import { UUID } from 'crypto';

export interface IAccount {
    id?: UUID;
    role: string;
    email: string;
    phone: string;
    password?: string;
    fio: string;
    imgUrl?: string;
    active: boolean;
}
