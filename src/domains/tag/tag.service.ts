import { Inject, Injectable } from '@nestjs/common';
import { Providers } from '../../common/constants/providers.constants';
import { ITagRepository } from '@/infrastructure/repository/tag/tag.repository.interface';
import { CreateTagDto } from '@/api/http/controllers/dto/tags/create-tag.dto';
import { GetTagDto } from '@/api/http/controllers/dto/tags/get-tag.dto';
import { plainToClass } from 'class-transformer';

const tagRepo = () => Inject(Providers.TAG_REPO);
@Injectable()
export class TagService {
    constructor(@tagRepo() private readonly _tagRepository: ITagRepository) {}

    async create(dto: CreateTagDto): Promise<GetTagDto> {
        const entity = await this._tagRepository.create(dto);
        return plainToClass(GetTagDto, entity, { excludeExtraneousValues: true });
    }

    async getById(id: number): Promise<GetTagDto> {
        const entity = await this._tagRepository.getById(id);
        return plainToClass(GetTagDto, entity, { excludeExtraneousValues: true });
    }
    async getByIds(id: number[]): Promise<GetTagDto[]> {
        const entities = await this._tagRepository.getByIds(id);
        return entities.map((entity) =>
            plainToClass(GetTagDto, entity, { excludeExtraneousValues: true }),
        );
    }
}
