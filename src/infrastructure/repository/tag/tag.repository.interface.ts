import { ITagProps } from '@/common/interface/tag/tag.interface';

export interface ITagRepository {
    create(createFields: ITagProps): Promise<ITagProps>;
    getById(id: number): Promise<ITagProps>;
    getByIds(ids: number[]): Promise<ITagProps[]>;
}
