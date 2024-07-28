import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessRepositoryModule } from '@/infrastructure/repository/business/business.repository.module';
import { BusinessMicroserviceController } from '@/api/microservice/controllers/business-microservice.controller';
import { OwnerModule } from '../owner/owner.module';

@Module({
    imports: [BusinessRepositoryModule, OwnerModule],
    controllers: [BusinessMicroserviceController],
    providers: [BusinessService],
    exports: [BusinessService],
})
export class BusinessModule {}
