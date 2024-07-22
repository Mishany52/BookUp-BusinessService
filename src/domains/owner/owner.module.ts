import { Module } from '@nestjs/common';
import { OwnerRepositoryModule } from '@/infrastructure/repository/owner/owner-repository.module';
import { OwnerService } from './owner.service';
import { OwnerMicroserviceController } from '@/api/microservice/controllers/owner-microservice.controller';
import { accountServiceProvider } from '../account/account-service-persistence.provider';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerMicroserviceController],
    providers: [OwnerService, accountServiceProvider],
    exports: [OwnerService],
})
export class OwnerModule {}
