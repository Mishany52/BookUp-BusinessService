import { Provider } from '@nestjs/common';
import { AdministratorRepository } from './administrator.repository.service';

export const adminRepoProvider: Provider = {
    provide: 'adminRepo',
    useClass: AdministratorRepository,
};
