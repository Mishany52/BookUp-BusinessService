import { IBusinessProps } from '@/common/interface/business/business.interface';
import { CreateBusinessDto } from './create-business.dto';

export class GetBusinessDto extends CreateBusinessDto {
    id: number;
    constructor(props: IBusinessProps) {
        super();
        this.id = props.id;
        this.name = props.name;
        this.address = props.address;
        this.description = props.description;
        this.logoUrl = props.logoUrl || null;
        this.siteUrl = props.siteUrl || null;
        this.weekWorkTime = props.weekWorkTime;
        this.ownerId = props.owner.id;
        this.postIndex = props.postIndex;
    }
}
