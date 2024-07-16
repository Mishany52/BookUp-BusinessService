import { IBusiness } from '@/domains/interface/business/business.interface';
import { MinLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerEntity } from '../owner/owner.entity';

@Entity({ name: 'businesses' })
export class BusinessEntity implements IBusiness {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column({ type: 'uuid', nullable: false })
    ownerId!: string;
    //! Предполагаю, что sudCategoryId будет enum. Пока оставляем как string
    @Column({ type: 'varchar', nullable: false })
    sudCategoryId!: string;
    @Column({ type: 'varchar', nullable: false })
    name!: string;
    @Column({ type: 'varchar', nullable: true })
    description?: string;
    @Column({ type: 'varchar', nullable: false })
    address: string;
    @Column({ type: 'varchar', length: 6, nullable: false })
    @MinLength(6)
    postIndex: string;
    @Column({ type: 'time', nullable: false })
    startAt!: string;
    @Column({ type: 'time', nullable: false })
    stopAt!: string;
    @Column({ type: 'varchar', nullable: true })
    siteUrl?: string;
    @Column({ type: 'varchar', nullable: true })
    logoUrl?: string;

    @ManyToOne(() => OwnerEntity, (owner) => owner.businesses)
    owner: OwnerEntity;
}
