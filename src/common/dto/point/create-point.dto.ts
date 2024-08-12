import { RequestCreatePointDto } from '@/api/http/controllers/dto/point/request-create-point.dto';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { ITagProps } from '@/common/interface/tag/tag.interface';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';

export class CreatePointDto implements IPointProps {
    name: string;
    description: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTimeProps;
    siteUrl: string;
    logoUrl: string;
    business: IBusinessProps;
    tags: ITagProps[];

    constructor(props: RequestCreatePointDto, business: IBusinessProps, tags: ITagProps[]) {
        this.name = props.name;
        this.description = props.description || null;
        this.address = props.address;
        this.postIndex = props.postIndex;
        this.weekWorkTime = props.weekWorkTime;
        this.siteUrl = props.siteUrl || null;
        this.logoUrl = props.logoUrl || null;
        this.business = business;
        this.tags = tags;
    }
}
