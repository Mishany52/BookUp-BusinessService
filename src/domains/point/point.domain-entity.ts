import { GetPointDto } from '@/api/http/controllers/dto/point/get-point.dto';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IEmployeeProps } from '@/common/interface/employee/employee.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { ITagProps } from '@/common/interface/tag/tag.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';

export class PointDomainEntity implements IPointProps {
    id: number;
    name: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTimeProps;
    business: IBusinessProps;
    tags: ITagProps[];
    description?: string;
    siteUrl?: string;
    logoUrl?: string;
    administrator?: IAdministratorProps;
    employees?: IEmployeeProps[];

    public getDto(): GetPointDto {
        return new GetPointDto(this);
    }
    private constructor(props: IPointProps) {
        if (props.id) {
            this.id = props.id;
        }
        this.name = props.name;
        this.description = props.description || null;
        this.address = props.address;
        this.postIndex = props.postIndex;
        this.weekWorkTime = props.weekWorkTime;
        this.siteUrl = props.siteUrl || null;
        this.logoUrl = props.logoUrl || null;
        this.business = props.business;
        this.administrator = props.administrator || null;
        this.employees = props.employees || null;
        this.tags = props.tags;
    }

    static create(props: IPointProps) {
        return new PointDomainEntity({ ...props });
    }
}
