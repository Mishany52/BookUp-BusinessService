import { GetBusinessDto } from '@/api/http/controllers/dto/business/get-business.dto';
import { IOwnerProps } from '../../common/interface/owner/owner.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { plainToClass } from 'class-transformer';

export class BusinessDomainEntity implements IBusinessProps {
    id: number;
    name: string;
    description: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTimeProps;
    siteUrl: string;
    logoUrl: string;
    owner: IOwnerProps;
    administrators: IAdministratorProps[];

    public getDto(): GetBusinessDto {
        return plainToClass(GetBusinessDto, this);
    }
    private constructor(props: IBusinessProps) {
        if (props.id) {
            this.id = props.id;
        }
        this.name = props.name || null;
        this.description = props.description || null;
        this.address = props.address || null;
        this.postIndex = props.postIndex || null;
        this.weekWorkTime = props.weekWorkTime || null;
        this.siteUrl = props.siteUrl || null;
        this.logoUrl = props.logoUrl || null;
        this.owner = props.owner || null;
        this.administrators = props.administrators || null;
    }

    public static create(props: IBusinessProps): BusinessDomainEntity {
        const business = new BusinessDomainEntity({ ...props });
        return business;
    }
}
