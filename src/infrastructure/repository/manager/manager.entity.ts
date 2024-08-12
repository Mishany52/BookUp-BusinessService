import { IManagerProps } from '@/common/interface/manager/manager.interface';
import { Min } from 'class-validator';
import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('managers')
export class ManagerEntity implements IManagerProps {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'uuid', nullable: false })
    accountId: UUID;
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;
    @Column({ type: 'varchar', nullable: false })
    fio: string;
    @Column({ type: 'varchar', unique: true, nullable: false })
    @Min(11)
    phone: string;
    @Column({ type: 'boolean', default: true })
    active: boolean;
    @Column({ type: 'varchar', nullable: true })
    imgUrl: string;
}
