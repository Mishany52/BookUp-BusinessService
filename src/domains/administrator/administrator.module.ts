import { AdministratorRepositoryModule } from '@/infrastructure/repository/administrator/administrator.repository.module';
import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from '@/api/http/controllers/administrator-http.controller';
import { ssoServiceProvider } from '../sso/sso-service.persistence-provider';

@Module({
    imports: [AdministratorRepositoryModule],
    controllers: [AdministratorController],
    providers: [AdministratorService, ssoServiceProvider],
    exports: [AdministratorService],
})
export class AdministratorModule {}
