import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from './owner.repository.interface';
import { OwnerEntity } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from '@/api/http/controllers/dto/create-owner.dto';
import { IOwner } from '../../../domains/interface/owner/owner.interface';
import {
    OWNER_CREATION_FAILED,
    OWNER_NOT_UPDATE,
} from '@/infrastructure/constants/http-messages/errors.constants';
import { OwnerUpdateDto } from '@/api/http/controllers/dto/update-owner.dto';

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
    async save(ownerUpdate: OwnerUpdateDto): Promise<IOwner> {
        try {
            const owner = await this._ownerRepository.save(ownerUpdate);
            return owner;
        } catch (error) {
            throw new Error(OWNER_NOT_UPDATE);
        }
    }
}
