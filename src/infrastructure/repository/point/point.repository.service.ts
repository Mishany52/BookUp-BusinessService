import { Injectable } from '@nestjs/common';
import { IPointRepository } from './point.repository.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PointEntity } from './point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointRepository implements IPointRepository {
    constructor(
        @InjectRepository(PointEntity) private readonly _pointRepository: Repository<PointEntity>,
    ) {}
    async create(createFields: Partial<IPointProps>): Promise<IPointProps> {
        return this._pointRepository.save(createFields);
    }
}
