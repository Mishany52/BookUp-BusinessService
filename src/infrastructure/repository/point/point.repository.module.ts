import { TypeOrmModule } from '@nestjs/typeorm';
import { PointEntity } from './point.entity';
import { pointRepoProvider } from './point.persistence-provider';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([PointEntity])],
    controllers: [],
    providers: [pointRepoProvider],
    exports: [pointRepoProvider],
})
export class PointRepositoryModule {}
