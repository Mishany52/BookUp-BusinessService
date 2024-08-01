import { IAdministratorDomainEntity } from '../../common/interface/administrator/administrator.interface';
import { IBusinessDomainEntity } from '../../common/interface/business/business.domain-entity.interface';
import { IOwner } from '../../common/interface/owner/owner.interface';
import { IWorkTime } from '../../common/interface/time/work-time.interface';

export class BusinessDomainEntity implements IBusinessDomainEntity {
    id: number;
    name: string;
    description: string;
    address: string;
    postIndex: number;
    weekWorkTime: IWorkTime;
    siteUrl: string;
    logoUrl: string;
    owner: IOwner;
    administrators: IAdministratorDomainEntity[];

    constructor(model: Partial<BusinessDomainEntity>) {
        if (model.id) {
            this.id = model.id;
        }
        this.name = model.name || null;
        this.description = model.description || null;
        this.address = model.address || null;
        this.postIndex = model.postIndex || null;
        this.weekWorkTime = model.weekWorkTime || null;
        this.siteUrl = model.siteUrl || null;
        this.logoUrl = model.logoUrl || null;
        this.owner = model.owner || null;
        this.administrators = model.administrators || null;
    }
}
