import { Provider } from '@nestjs/common';
import { PointRepository } from './point.repository.service';

export const pointRepoProvider: Provider = {
    provide: 'pointRepo',
    useClass: PointRepository,
};
