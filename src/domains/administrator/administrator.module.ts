import { AdministratorRepositoryModule } from '@/infrastructure/repository/administrator/administrator.repository.module';
import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from '@/api/http/controllers/administrator-http.controller';
import { BusinessModule } from '../business/business.module';
import { ssoServiceProvider } from '@/infrastructure/ports/sso-service.persistence-provider';
import { authServiceProvider } from '@/infrastructure/ports/auth-service.persistence-provider';
import { accountServiceProvider } from '@/infrastructure/ports/account-service.persistence-provider';

@Module({
    imports: [AdministratorRepositoryModule, BusinessModule],
    controllers: [AdministratorController],
    providers: [
        AdministratorService,
        ssoServiceProvider,
        authServiceProvider,
        accountServiceProvider,
    ],
    exports: [AdministratorService],
})
export class AdministratorModule {}
