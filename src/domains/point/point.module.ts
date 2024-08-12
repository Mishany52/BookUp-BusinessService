import { PointRepositoryModule } from '@/infrastructure/repository/point/point.repository.module';
import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointHttpController } from '@/api/http/controllers/point-http.controller';
import { TagModule } from '../tag/tag.module';
import { BusinessModule } from '../business/business.module';

@Module({
    imports: [PointRepositoryModule, TagModule, BusinessModule],
    controllers: [PointHttpController],
    providers: [PointService],
    exports: [PointService],
})
export class PointModule {}
