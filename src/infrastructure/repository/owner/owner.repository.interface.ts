import { IOwner } from '../../../domains/interface/owner/owner.interface';

export interface IOwnerRepository {
    create(createFields: Partial<IOwner>): Promise<IOwner>;
    save(ownerUpdate: IOwner): Promise<IOwner>;
}
