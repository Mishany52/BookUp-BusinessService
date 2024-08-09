import { Provider } from '@nestjs/common';
import { AdministratorRepository } from '@/infrastructure/repository/administrator/administrator.repository.service';

export const adminRepoProvider: Provider = {
    provide: 'adminRepo',
    useClass: AdministratorRepository,
};
