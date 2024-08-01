import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntity } from './business.entity';
import { businessRepoProvider } from './business.persistence-provider';
import { TagEntity } from '../tag/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BusinessEntity, TagEntity])],
    controllers: [],
    providers: [businessRepoProvider],
    exports: [businessRepoProvider],
})
export class BusinessRepositoryModule {}
