import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerEntity } from './owner.entity';
import { ownerRepoProvider } from './owner-persistence.provider';
import { BusinessEntity } from '../business/business.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OwnerEntity, BusinessEntity])],
    providers: [ownerRepoProvider],
    exports: [ownerRepoProvider],
})
export class OwnerRepositoryModule {}
