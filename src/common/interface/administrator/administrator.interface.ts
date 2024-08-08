import { UUID } from 'crypto';
import { IPointProps } from '../point/point.interface';
import { IBusinessProps } from '../business/business.interface';

export interface IAdministratorProps {
    id?: number;
    accountId: UUID;
    email: string;
    phone: string;
    fio: string;
    active: boolean;
    imgUrl?: string;
    business: IBusinessProps;
    points?: IPointProps[];
}
