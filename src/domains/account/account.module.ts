import { AccountController } from '@/api/http/controllers/account.http-controller';
import { Module } from '@nestjs/common';
import { ssoServiceProvider } from '../sso/sso-service.persistence-provider';
import { OwnerModule } from '../owner/owner.module';
import { AdministratorModule } from '../administrator/administrator.module';
import { AccountService } from './account.service';

@Module({
    imports: [AccountModule, OwnerModule, AdministratorModule],
    controllers: [AccountController],
    providers: [ssoServiceProvider, AccountService],
    exports: [AccountService],
})
export class AccountModule {}
