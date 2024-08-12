import { GetBusinessDto } from '@/api/http/controllers/dto/business/get-business.dto';
import { IOwnerProps } from '../../common/interface/owner/owner.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { IManagerProps } from '@/common/interface/manager/manager.interface';
import { ITagProps } from '@/common/interface/tag/tag.interface';
import { GetBusinessCountAllWorkersDto } from '@/api/http/controllers/dto/business/get-business-for-list.dto';

export class BusinessDomainEntity implements IBusinessProps {
    id?: number;
    name: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTimeProps;
    owner: IOwnerProps;
    description?: string;
    siteUrl?: string;
    logoUrl?: string;
    administrators?: IAdministratorProps[];
    points?: IPointProps[];
    managers?: IManagerProps[];
    tags: ITagProps[];
    public getDto(): GetBusinessDto {
        return new GetBusinessDto(this);
    }
    public getList() {
        return new GetBusinessCountAllWorkersDto(this);
    }
    private constructor(props: IBusinessProps) {
        Object.assign(this, props);
    }

    public static create(props: IBusinessProps): BusinessDomainEntity {
        const business = new BusinessDomainEntity({ ...props });
        return business;
    }
}
