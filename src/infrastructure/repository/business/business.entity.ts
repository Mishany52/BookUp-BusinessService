import { IBusiness } from '@/domains/interface/business/business.interface';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerEntity } from '../owner/owner.entity';
import { AdministratorEntity } from '../administrator/administrator.entity';
import { PointEntity } from '../point/point.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { IWorkTime } from '@/domains/interface/time/workTime.interface';

@Entity({ name: 'businesses' })
export class BusinessEntity implements IBusiness {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;
    @Column({ type: 'varchar', nullable: true })
    description: string;
    @Column({ type: 'varchar', nullable: false })
    address: string;
    @Column({ type: 'json' })
    weekWorkTime: IWorkTime;
    @Column({ type: 'integer', nullable: false })
    postIndex: number;
    @Column({ type: 'varchar', nullable: true })
    siteUrl: string;
    @Column({ type: 'varchar', nullable: true })
    logoUrl: string;

    @ManyToOne(() => OwnerEntity, (owner) => owner.businesses)
    owner: OwnerEntity;
    @OneToMany(() => AdministratorEntity, (administrator) => administrator.business)
    administrator: AdministratorEntity[];
    @OneToMany(() => PointEntity, (point) => point.business)
    points: PointEntity[];
    @OneToMany(() => EmployeeEntity, (employee) => employee.business)
    employees: EmployeeEntity[];
    tags: number;
}
