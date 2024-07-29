import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from './owner.repository.interface';
import { OwnerEntity } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from '@/api/http/controllers/dto/owner/create-owner.dto';
import { IOwner } from '../../../common/interface/owner/owner.interface';
import { OwnerError } from '@/common/constants/http-messages/errors.constants';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';

@Injectable()
export class OwnerRepository implements IOwnerRepository {
    constructor(
        @InjectRepository(OwnerEntity)
        private readonly _ownerRepository: Repository<OwnerEntity>,
    ) {}

    async create(createFields: CreateOwnerDto): Promise<IOwner> {
        const owner = this._ownerRepository.create(createFields);
        await this._ownerRepository.save(owner);
        return owner;
    }
    async update(ownerUpdate: UpdateOwnerDto): Promise<IOwner> {
        try {
            const owner = await this._ownerRepository.save(ownerUpdate);
            return owner;
        } catch (error) {
            throw new Error(OwnerError.OWNER_NOT_UPDATE);
        }
    }

    async getById(ownerId: number): Promise<IOwner | undefined> {
        const owner = await this._ownerRepository.findOne({ where: { id: ownerId } });
        return owner;
    }
}
