import { AccountController } from '@/api/http/controllers/account.http-controller';
import { Module } from '@nestjs/common';
import { OwnerModule } from '../owner/owner.module';
import { AdministratorModule } from '../administrator/administrator.module';
import { AccountService } from './account.service';
import { ssoServiceProvider } from '@/infrastructure/ports/sso-service.persistence-provider';

@Module({
    imports: [AccountModule, OwnerModule, AdministratorModule],
    controllers: [AccountController],
    providers: [AccountService, ssoServiceProvider],
    exports: [AccountService],
})
export class AccountModule {}
