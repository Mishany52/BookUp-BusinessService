import { UUID } from 'crypto';

export interface IBusiness {
    id: UUID;
    ownerId: UUID;
    //!Потом определим enum
    sudCategoryId: string;
    name: string;
    description?: string;
    address: string;
    postIndex: string;
    startAt: string;
    stopAt: string;
    siteUrl?: string;
    logoUrl?: string;
}
