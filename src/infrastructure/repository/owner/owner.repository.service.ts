import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from './owner.repository.interface';
import { OwnerEntity } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from '@/api/http/controllers/dto/owner/create-owner.dto';
import { IOwner } from '../../../domains/interface/owner/owner.interface';
import {
    OWNER_CREATION_FAILED,
    OWNER_NOT_FOUND_BY_ID,
    OWNER_NOT_UPDATE,
} from '@/infrastructure/constants/http-messages/errors.constants';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { UUID } from 'crypto';

@Injectable()
export class OwnerRepository implements IOwnerRepository {
    constructor(
        @InjectRepository(OwnerEntity)
        private readonly _ownerRepository: Repository<OwnerEntity>,
    ) {}

    async create(createFields: CreateOwnerDto): Promise<IOwner> {
        try {
            const owner = this._ownerRepository.create(createFields);
            await this._ownerRepository.save(owner);
            //!Потом сменить на mapper
            const createdOwner: IOwner = { ...owner };
            return createdOwner;
        } catch (error) {
            throw new Error(OWNER_CREATION_FAILED);
        }
    }
    async update(ownerUpdate: UpdateOwnerDto): Promise<IOwner> {
        try {
            const owner = await this._ownerRepository.save(ownerUpdate);
            return owner;
        } catch (error) {
            throw new Error(OWNER_NOT_UPDATE);
        }
    }

    async getById(ownerId: UUID): Promise<IOwner | undefined> {
        try {
            const owner = await this._ownerRepository.findOne({ where: { id: ownerId } });
            return owner;
        } catch (error) {
            throw new Error(OWNER_NOT_FOUND_BY_ID);
        }
    }
}
