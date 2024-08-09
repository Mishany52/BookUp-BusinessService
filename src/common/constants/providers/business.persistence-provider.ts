import { Provider } from '@nestjs/common';
import { BusinessRepository } from '@/infrastructure/repository/business/business.repository.service';

export const businessRepoProvider: Provider = {
    provide: 'businessRepo',
    useClass: BusinessRepository,
};
