import { IBusiness } from '@/domains/interface/business/business.interface';
import { MinLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerEntity } from '../owner/owner.entity';
import { UUID } from 'crypto';

@Entity({ name: 'businesses' })
export class BusinessEntity implements IBusiness {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;
    @Column({ type: 'uuid', nullable: false })
    ownerId: UUID;
    @Column({ type: 'integer', nullable: true, default: null })
    sudCategoryId: number;
    @Column({ type: 'varchar', nullable: false })
    name: string;
    @Column({ type: 'varchar', nullable: true })
    description: string;
    @Column({ type: 'varchar', nullable: false })
    address: string;
    @Column({ type: 'varchar', length: 6, nullable: false })
    @MinLength(6)
    postIndex: string;
    @Column({ type: 'time', nullable: false })
    startAt: string;
    @Column({ type: 'time', nullable: false })
    stopAt: string;
    @Column({ type: 'varchar', nullable: true })
    siteUrl: string;
    @Column({ type: 'varchar', nullable: true })
    logoUrl: string;

    @ManyToOne(() => OwnerEntity, (owner) => owner.businesses)
    owner: OwnerEntity;
}
