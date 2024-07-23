import { Module } from '@nestjs/common';
import { OwnerRepositoryModule } from '@/infrastructure/repository/owner/owner-repository.module';
import { OwnerService } from './owner.service';
import { OwnerMicroserviceController } from '@/api/http/controllers/owner-microservice.controller';
import { ssoServiceProvider } from '../account/sso-service-persistence.provider';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerMicroserviceController],
    providers: [OwnerService, ssoServiceProvider],
    exports: [OwnerService],
})
export class OwnerModule {}
