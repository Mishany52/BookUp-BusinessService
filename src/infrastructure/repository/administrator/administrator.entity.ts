import { IAdministrator } from '@/domains/interface/administrator/administrator.interface';
import { IsBoolean, IsEmail, IsPhoneNumber, IsUrl, IsUUID, Min } from 'class-validator';
import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessEntity } from '../business/business.entity';
import { PointEntity } from '../point/point.entity';

@Entity({ name: 'administrators' })
export class AdministratorEntity implements IAdministrator {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: UUID;

    @Column({ type: 'uuid', nullable: false })
    @IsUUID()
    accountId: UUID;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    @Min(11)
    @IsPhoneNumber('RU')
    phone: string;

    @Column({ type: 'varchar', nullable: false })
    fio: string;

    @Column({ type: 'boolean', default: true })
    @IsBoolean()
    active: boolean;

    //? Какой тип должен быть у ссылки и ее пример нужен
    @Column({ type: 'varchar', nullable: true })
    @IsUrl()
    imgUrl: string;

    @ManyToOne(() => BusinessEntity, (business) => business.administrator)
    business: BusinessEntity;

    @OneToMany(() => PointEntity, (point) => point.business)
    points: PointEntity[];
}
