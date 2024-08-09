import { IPointProps } from '@/common/interface/point/point.interface';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessEntity } from '../business/business.entity';
import { AdministratorEntity } from '../administrator/administrator.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { TagEntity } from '../tag/tag.entity';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';

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

    @Column({ type: 'integer', nullable: true })
    postIndex: number;

    @Column({ type: 'varchar', nullable: true })
    siteUrl: string;

    @Column({ type: 'varchar', nullable: true })
    logoUrl: string;

    @ManyToOne(() => BusinessEntity, (business) => business.points, { nullable: false })
    business: BusinessEntity;

    @ManyToOne(() => AdministratorEntity, (admin) => admin.points, { nullable: true })
    administrator: AdministratorEntity;

    @ManyToMany(() => EmployeeEntity, { nullable: true })
    @JoinTable()
    employees: EmployeeEntity[];

    @ManyToMany(() => TagEntity, { nullable: false })
    @JoinTable()
    tags: TagEntity[];
}
