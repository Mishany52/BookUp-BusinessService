import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminRepoProvider } from './ administrator.persistence-provider';
import { AdministratorEntity } from './administrator.entity';
import { PointEntity } from '../point/point.entity';
import { EmployeeEntity } from '../employee/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AdministratorEntity, PointEntity, EmployeeEntity])],
    providers: [adminRepoProvider],
    exports: [adminRepoProvider],
})
export class AdministratorRepositoryModule {}
