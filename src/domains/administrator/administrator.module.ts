import { AdministratorRepositoryModule } from '@/infrastructure/repository/administrator/administrator.repository.module';
import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { accountServiceProvider } from '../account/account-service-persistence.provider';
import { AdministratorController } from '@/api/microservice/controllers/administrator.controller';

@Module({
    imports: [AdministratorRepositoryModule],
    controllers: [AdministratorController],
    providers: [AdministratorService, accountServiceProvider],
    exports: [AdministratorService],
})
export class AdministratorModule {}
