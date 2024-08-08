import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Providers } from '../../common/constants/providers.constants';
import { IPointRepository } from '@/infrastructure/repository/point/point.repository.interface';
import { RequestCreatePointDto } from '@/api/http/controllers/dto/point/request-create-point.dto';
import { GetPointDto } from '@/api/http/controllers/dto/point/get-point.dto';
import { PointError, TagError } from '@/common/constants/http-messages/errors.constants';
import { BusinessService } from '../business/business.service';
import { TagService } from '../tag/tag.service';
import { CreatePointDto } from '@/common/dto/point/create-point.dto';
import { PointDomainEntity } from './point.domain-entity';

const pointRepo = () => Inject(Providers.POINT_REPO);
@Injectable()
export class PointService {
    constructor(
        @pointRepo() private readonly _pointRepository: IPointRepository,
        private readonly _businessService: BusinessService,
        private readonly _tagService: TagService,
    ) {}

    async create(pointDto: RequestCreatePointDto): Promise<GetPointDto> {
        const business = await this._businessService.getById(pointDto.businessId);
        const tags = await this._tagService.getByIds(pointDto.tagIds);
        if (tags.length == 0) {
            throw new HttpException(TagError.TAG_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        const createPointDto = new CreatePointDto(pointDto, business, tags);
        const pointEntity = await this._pointRepository.create(createPointDto);
        if (!pointEntity) {
            throw new HttpException(PointError.POINT_NOT_CREATED, HttpStatus.BAD_REQUEST);
        }
        const pointDomainEntity = PointDomainEntity.create(pointEntity);
        return pointDomainEntity.getDto();
    }
}
