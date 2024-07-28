import { IAdministrator } from '@/domains/interface/administrator/administrator.interface';
import { IBusiness } from '@/domains/interface/business/business.interface';
import { IPoint } from '@/domains/interface/point/point.interface';
import { IsBoolean, IsEmail, IsPhoneNumber, IsString, IsUrl, IsUUID, Min } from 'class-validator';
import { UUID } from 'crypto';

export class GetAdminDto implements IAdministrator {
    @IsUUID()
    id: UUID;
    @IsUUID()
    accountId: UUID;
    @IsEmail()
    email: string;
    @Min(11)
    @IsPhoneNumber('RU')
    phone: string;
    @IsString()
    fio: string;
    @IsBoolean()
    active: boolean;
    @IsUrl()
    imgUrl: string;
    business: IBusiness;
    points: IPoint[];
    constructor(admin: IAdministrator) {
        this.id = admin.id;
        this.accountId = admin.accountId;
        this.email = admin.email;
        this.phone = admin.phone;
        this.fio = admin.fio;
        this.active = admin.active;
        this.imgUrl = admin.imgUrl;
    }
}
