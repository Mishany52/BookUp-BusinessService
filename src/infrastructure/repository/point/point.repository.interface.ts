import { CreatePointDto } from '@/common/dto/point/create-point.dto';
import { IPointProps } from '@/common/interface/point/point.interface';

export interface IPointRepository {
    create(createFields: CreatePointDto): Promise<IPointProps>;
}
