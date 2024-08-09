import { Provider } from '@nestjs/common';
import { BusinessRepository } from './business.repository.service';

export const businessRepoProvider: Provider = {
    provide: 'businessRepo',
    useClass: BusinessRepository,
};
