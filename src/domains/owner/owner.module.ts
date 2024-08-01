import { Module } from '@nestjs/common';
import { OwnerRepositoryModule } from '@/infrastructure/repository/owner/owner.repository.module';
import { OwnerService } from './owner.service';
<<<<<<< HEAD
import { OwnerMicroserviceController } from '@/api/http/controllers/owner-microservice.controller';
import { ssoServiceProvider } from '../account/sso-service-persistence.provider';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerMicroserviceController],
    providers: [OwnerService, ssoServiceProvider],
    exports: [OwnerService],
=======

import { accountServiceProvider } from '../sso/sso-service.persistence-provider';
import { OwnerHttpController } from '@/api/http/controllers/owner-http.controller';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerHttpController],
    providers: [OwnerService, accountServiceProvider],
    exports: [OwnerService, accountServiceProvider],
>>>>>>> develop
})
export class OwnerModule {}
