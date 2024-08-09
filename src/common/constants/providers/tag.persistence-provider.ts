import { Provider } from '@nestjs/common';
import { TagRepository } from './tag.repository.service';

export const tagRepoProvider: Provider = {
    provide: 'tagRepo',
    useClass: TagRepository,
};
