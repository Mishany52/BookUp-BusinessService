import { Module } from '@nestjs/common';
import { OwnerRepositoryModule } from '@/infrastructure/repository/owner/owner.repository.module';
import { OwnerService } from './owner.service';

import { OwnerHttpController } from '@/api/http/controllers/owner-http.controller';
import { ssoServiceProvider } from '../sso/sso-service.persistence-provider';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerHttpController],
    providers: [OwnerService, ssoServiceProvider],
    exports: [OwnerService, ssoServiceProvider],
})
export class OwnerModule {}
