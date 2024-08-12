import { Provider } from '@nestjs/common';
import { PointRepository } from '../../../infrastructure/repository/point/point.repository.service';

export const pointRepoProvider: Provider = {
    provide: 'pointRepo',
    useClass: PointRepository,
};
