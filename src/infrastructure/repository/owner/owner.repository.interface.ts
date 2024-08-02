import { IOwnerProps } from '@/common/interface/owner/owner.interface';

export interface IOwnerRepository {
    create(createFields: IOwnerProps): Promise<IOwnerProps>;
    update(ownerUpdate: Partial<IOwnerProps>): Promise<IOwnerProps>;
    getById(ownerId: number): Promise<IOwnerProps>;
}
