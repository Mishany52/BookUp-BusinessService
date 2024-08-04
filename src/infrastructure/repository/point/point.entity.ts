import { IPointProps } from '@/common/interface/point/point.interface';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessEntity } from '../business/business.entity';
import { AdministratorEntity } from '../administrator/administrator.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';
import { TagEntity } from '../tag/tag.entity';
import { IWorkTime } from '@/common/interface/time/work-time.interface';

@Entity({ name: 'points' })
export class PointEntity implements IPointProps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'json' })
    weekWorkTime: IWorkTimeProps;

    @Column({ type: 'varchar', nullable: false })
    address: string;

    @Column({ type: 'integer', nullable: false })
    postIdex: number;

    @Column({ type: 'time', nullable: false })
    startAt: Date;

    @Column({ type: 'time', nullable: false })
    stopAt: Date;

    @Column({ type: 'varchar', nullable: true })
    siteUrl: string;

    @Column({ type: 'varchar', nullable: true })
    logoUrl: string;

    @ManyToOne(() => BusinessEntity, (business) => business.points)
    business: BusinessEntity;

    @ManyToOne(() => AdministratorEntity, (admin) => admin.points)
    administrator: AdministratorEntity;

    @ManyToMany(() => EmployeeEntity)
    employees: EmployeeEntity[];

    @ManyToMany(() => TagEntity)
    tags: TagEntity[];
}
