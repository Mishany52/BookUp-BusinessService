import { ITagProps } from '@/common/interface/tag/tag.interface';
import { ITagRepository } from './tag.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository implements ITagRepository {
    constructor(
        @InjectRepository(TagEntity) private readonly _tagRepository: Repository<TagEntity>,
    ) {}
    async getByIds(ids: number[]): Promise<ITagProps[]> {
        return this._tagRepository.find({ where: { id: In(ids) } });
    }
    async create(createFields: ITagProps): Promise<ITagProps> {
        return this._tagRepository.save(createFields);
    }
    async getById(id: number): Promise<ITagProps> {
        return this._tagRepository.findOne({ where: { id } });
    }
}
