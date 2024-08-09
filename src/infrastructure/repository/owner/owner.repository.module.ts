import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerEntity } from './owner.entity';
import { ownerRepoProvider } from '@/common/constants/providers/owner.persistence-provider';

@Module({
    imports: [TypeOrmModule.forFeature([OwnerEntity])],
    providers: [ownerRepoProvider],
    exports: [ownerRepoProvider],
})
export class OwnerRepositoryModule {}
