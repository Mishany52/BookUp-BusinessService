import { Provider } from '@nestjs/common';
import { OwnerRepository } from './owner.repository.service';

export const ownerRepoProvider: Provider = {
    provide: 'ownerRepo',
    useClass: OwnerRepository,
};
