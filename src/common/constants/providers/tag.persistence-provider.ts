import { Provider } from '@nestjs/common';
import { TagRepository } from '@/infrastructure/repository/tag/tag.repository.service';

export const tagRepoProvider: Provider = {
    provide: 'tagRepo',
    useClass: TagRepository,
};
