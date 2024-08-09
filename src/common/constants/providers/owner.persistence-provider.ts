import { Provider } from '@nestjs/common';
import { OwnerRepository } from '@/infrastructure/repository/owner/owner.repository.service';

export const ownerRepoProvider: Provider = {
    provide: 'ownerRepo',
    useClass: OwnerRepository,
};
