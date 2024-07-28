import { IEmployee } from '@/domains/interface/employee/employee.interface';
import { IsBoolean, IsEmail, IsPhoneNumber, IsString, IsUrl, IsUUID, Min } from 'class-validator';
import { UUID } from 'crypto';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PointEntity } from '../point/point.entity';
import { BusinessEntity } from '../business/business.entity';

@Entity({ name: 'employees' })
export class EmployeeEntity implements IEmployee {
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
    @IsString()
    fio: string;

    @Column({ type: 'varchar', nullable: true })
    @IsUrl()
    imgUrl: string;

    @Column({ type: 'boolean', default: true })
    @IsBoolean()
    active: boolean;

    @ManyToMany(() => PointEntity, (point) => point.employees)
    points: PointEntity[];

    @ManyToOne(() => BusinessEntity, (business) => business.employees)
    business: BusinessEntity;
}
