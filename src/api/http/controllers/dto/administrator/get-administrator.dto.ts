import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsObject,
    IsPhoneNumber,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator';

import { UUID } from 'crypto';
import { GetBusinessDto } from '../business/get-business.dto';
export class GetAdminDto implements IAdministratorProps {
    @IsNumber()
    id: number;

    @IsUUID()
    accountId: UUID;

    @IsEmail()
    email: string;

    @IsPhoneNumber('RU')
    phone: string;

    @IsString()
    fio: string;

    @IsBoolean()
    active: boolean;

    @IsUrl()
    imgUrl: string;

    @IsObject()
    @Type(() => GetBusinessDto)
    business: IBusinessProps;
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
