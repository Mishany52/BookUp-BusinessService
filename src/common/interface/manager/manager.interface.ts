import { UUID } from 'crypto';
import { IPointProps } from '../point/point.interface';

export interface IManagerProps {
    id?: number;
    accountId?: UUID;
    fio: string;
    email: string;
    phone: string;
    active: boolean;
    points?: IPointProps[];
    imgUrl?: string;
}
