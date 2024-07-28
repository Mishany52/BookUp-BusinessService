import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntity } from './business.entity';
import { businessRepoProvider } from './business.persistence-provider';

@Module({
    imports: [TypeOrmModule.forFeature([BusinessEntity])],
    controllers: [],
    providers: [businessRepoProvider],
    exports: [businessRepoProvider],
})
export class BusinessRepositoryModule {}
