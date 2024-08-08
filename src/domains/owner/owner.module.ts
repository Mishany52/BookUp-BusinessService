import { Module } from '@nestjs/common';
import { OwnerRepositoryModule } from '@/infrastructure/repository/owner/owner.repository.module';
import { OwnerService } from './owner.service';

import { OwnerHttpController } from '@/api/http/controllers/owner-http.controller';
import { accountServiceProvider } from '@/infrastructure/ports/account-service.persistence-provider';
import { ssoServiceProvider } from '@/infrastructure/ports/sso-service.persistence-provider';
import { authServiceProvider } from '@/infrastructure/ports/auth-service.persistence-provider';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerHttpController],
    providers: [OwnerService, accountServiceProvider, ssoServiceProvider, authServiceProvider],
    exports: [OwnerService],
})
export class OwnerModule {}
