export interface IBusiness {
    id: string;
    ownerId: string;
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
