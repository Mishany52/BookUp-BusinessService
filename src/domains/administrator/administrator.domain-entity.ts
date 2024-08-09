import { GetAdminDto } from '@/api/http/controllers/dto/administrator/get-administrator.dto';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { UUID } from 'crypto';

export class AdministratorDomainEntity implements IAdministratorProps {
    id: number;
    accountId: UUID;
    email: string;
    phone: string;
    fio: string;
    active: boolean;
    imgUrl: string;
    business: IBusinessProps;
    points?: IPointProps[];

    private constructor(props: IAdministratorProps) {
        this.id = props.id || null;
        this.accountId = props.accountId;
        this.email = props.email;
        this.phone = props.phone;
        this.fio = props.fio;
        this.active = props.active;
        this.business = props.business;
        this.points = props.points || null;
    }

    public getDto() {
        return new GetAdminDto(this);
    }
    static create(props: IAdministratorProps) {
        return new AdministratorDomainEntity({ ...props });
    }
}
