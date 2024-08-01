import { IOwner } from '../../../common/interface/owner/owner.interface';

export interface IOwnerRepository {
    create(createFields: Partial<IOwner>): Promise<IOwner>;
    update(ownerUpdate: IOwner): Promise<IOwner>;
    getById(ownerId: number): Promise<IOwner>;
}
