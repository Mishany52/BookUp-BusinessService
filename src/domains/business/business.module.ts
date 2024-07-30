import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessRepositoryModule } from '@/infrastructure/repository/business/business.repository.module';
import { BusinessHttpController } from '@/api/http/controllers/business-http.controller';
import { OwnerModule } from '../owner/owner.module';

@Module({
    imports: [BusinessRepositoryModule, OwnerModule],
    controllers: [BusinessHttpController],
    providers: [BusinessService],
    exports: [BusinessService],
})
export class BusinessModule {}
