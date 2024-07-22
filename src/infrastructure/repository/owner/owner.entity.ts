import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IOwner } from '../../../domains/interface/owner/owner.interface';
import { BusinessEntity } from '../business/business.entity';
import { MinLength } from 'class-validator';
import { UUID } from 'crypto';

@Entity({ name: 'owners' })
export class OwnerEntity implements IOwner {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;
    @Column({ type: 'uuid', nullable: false })
    accountId: UUID;
    @Column({ type: 'varchar', unique: true, nullable: false })
    @MinLength(11)
    phone: string;
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;
    @Column({ type: 'varchar', nullable: false })
    fio: string;
    //? Какой тип должен быть у ссылки и ее пример нужен
    @Column({
        type: 'text',
        nullable: true,
    })
    imgUrl: string;
    @Column({
        type: 'boolean',
        default: true,
    })
    active: boolean;
    @OneToMany(() => BusinessEntity, (business) => business.owner)
    businesses: BusinessEntity[];
}
