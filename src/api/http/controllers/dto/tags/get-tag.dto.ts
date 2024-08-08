import { ITagProps } from '@/common/interface/tag/tag.interface';
import { Expose } from 'class-transformer';

export class GetTagDto implements ITagProps {
    @Expose()
    id: number;
    @Expose()
    name: string;
}
