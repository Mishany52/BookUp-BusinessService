import { ITagProps } from '@/common/interface/tag/tag.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity implements ITagProps {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar' })
    name: string;
}
