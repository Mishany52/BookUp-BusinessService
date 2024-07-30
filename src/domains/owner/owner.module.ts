import { Module } from '@nestjs/common';
import { OwnerRepositoryModule } from '@/infrastructure/repository/owner/owner.repository.module';
import { OwnerService } from './owner.service';

import { accountServiceProvider } from '../sso/sso-service.persistence-provider';
import { OwnerHttpController } from '@/api/http/controllers/owner-http.controller';

@Module({
    imports: [OwnerRepositoryModule],
    controllers: [OwnerHttpController],
    providers: [OwnerService, accountServiceProvider],
    exports: [OwnerService, accountServiceProvider],
})
export class OwnerModule {}
