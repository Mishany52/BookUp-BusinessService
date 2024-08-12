import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { tagRepoProvider } from '@/common/constants/providers/tag.persistence-provider';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity])],
    providers: [tagRepoProvider],
    exports: [tagRepoProvider],
})
export class TagRepositoryModule {}
