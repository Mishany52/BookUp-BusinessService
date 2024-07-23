import { UUID } from 'crypto';
import { IOwner } from '../../../domains/interface/owner/owner.interface';

export interface IOwnerRepository {
    create(createFields: Partial<IOwner>): Promise<IOwner>;
    update(ownerUpdate: IOwner): Promise<IOwner>;
    getById(ownerId: UUID): Promise<IOwner>;
}
