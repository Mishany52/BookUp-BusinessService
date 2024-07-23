import { UUID } from 'crypto';

export interface IBusiness {
    id: UUID;
    ownerId: UUID;
    sudCategoryId: number;
    name: string;
    description?: string;
    address: string;
    postIndex: string;
    startAt: string;
    stopAt: string;
    siteUrl?: string;
    logoUrl?: string;
}
