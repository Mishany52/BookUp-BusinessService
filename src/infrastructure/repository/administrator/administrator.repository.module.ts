import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminRepoProvider } from './ administrator.persistence-provider';
import { AdministratorEntity } from './administrator.entity';
import { EmployeeEntity } from '../employee/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AdministratorEntity, EmployeeEntity])],
    providers: [adminRepoProvider],
    exports: [adminRepoProvider],
})
export class AdministratorRepositoryModule {}
