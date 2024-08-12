import { TagRepositoryModule } from '@/infrastructure/repository/tag/tag.repository.module';
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagHttpController } from '@/api/http/controllers/tag-http.controller';

@Module({
    imports: [TagRepositoryModule],
    controllers: [TagHttpController],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}
