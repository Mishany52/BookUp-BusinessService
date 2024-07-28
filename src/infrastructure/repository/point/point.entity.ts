import { IPoint } from '@/domains/interface/point/point.interface';
import { UUID } from 'crypto';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessEntity } from '../business/business.entity';
import { AdministratorEntity } from '../administrator/administrator.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { IWorkTime } from '@/domains/interface/time/workTime.interface';

@Entity({ name: 'points' })
export class PointEntity implements IPoint {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;
    @Column({ type: 'varchar', nullable: false })
    name: string;
    @Column({ type: 'text', nullable: true })
    description: string;
    @Column({ type: 'json' })
    weekWorkTime: IWorkTime;
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
    @ManyToMany(() => EmployeeEntity, (employee) => employee.points)
    employees: EmployeeEntity[];
    categoryId: number;
    subCategoryId: number;
}
