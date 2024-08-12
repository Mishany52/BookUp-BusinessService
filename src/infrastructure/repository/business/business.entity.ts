import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerEntity } from '../owner/owner.entity';
import { AdministratorEntity } from '../administrator/administrator.entity';
import { PointEntity } from '../point/point.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { TagEntity } from '../tag/tag.entity';
import { IBusinessProps } from '@/common/interface/business/business.interface';

@Entity({ name: 'businesses' })
export class BusinessEntity implements IBusinessProps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'varchar', nullable: false })
    address: string;

    @Column({ type: 'json' })
    weekWorkTime: IWorkTimeProps;

    @Column({ type: 'integer', nullable: false })
    postIndex: number;

    @Column({ type: 'varchar', nullable: true })
    siteUrl: string;

    @Column({ type: 'varchar', nullable: true })
    logoUrl: string;

    @ManyToOne(() => OwnerEntity, (owner) => owner.businesses)
    owner: OwnerEntity;

    @OneToMany(() => AdministratorEntity, (administrator) => administrator.business)
    administrators: AdministratorEntity[];

    @OneToMany(() => EmployeeEntity, (employee) => employee.business)
    employees: EmployeeEntity[];

    @OneToMany(() => PointEntity, (point) => point.business)
    points: PointEntity[];

    @ManyToMany(() => TagEntity)
    @JoinTable()
    tags: TagEntity[];
}
