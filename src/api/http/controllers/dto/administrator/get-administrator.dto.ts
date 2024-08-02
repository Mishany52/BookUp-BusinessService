import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { Exclude, Expose, Type } from 'class-transformer';

import { UUID } from 'crypto';
import { GetBusinessDto } from '../business/get-business.dto';
@Exclude()
export class GetAdminDto implements IAdministratorProps {
    @Expose()
    id: number;

    @Expose()
    accountId: UUID;

    @Expose()
    email: string;

    @Expose()
    phone: string;

    @Expose()
    fio: string;

    @Expose()
    active: boolean;

    @Expose()
    imgUrl: string;

    @Expose()
    @Type(() => GetBusinessDto)
    business: IBusinessProps;
    @Expose()
    points: IPointProps[];
    constructor(admin: IAdministratorProps) {
        this.id = admin.id;
        this.accountId = admin.accountId;
        this.email = admin.email;
        this.phone = admin.phone;
        this.fio = admin.fio;
        this.active = admin.active;
        this.imgUrl = admin.imgUrl;
        this.business = admin.business;
        this.points = admin.points;
    }
}
