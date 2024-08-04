import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from './owner.repository.interface';
import { OwnerEntity } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from '@/api/http/controllers/dto/owner/create-owner.dto';
import { UpdateOwnerDto } from '@/api/http/controllers/dto/owner/update-owner.dto';
import { IOwnerProps } from '@/common/interface/owner/owner.interface';

@Injectable()
export class OwnerRepository implements IOwnerRepository {
    constructor(
        @InjectRepository(OwnerEntity)
        private readonly _ownerRepository: Repository<OwnerEntity>,
    ) {}

    async create(createFields: CreateOwnerDto): Promise<IOwnerProps> {
        const owner = this._ownerRepository.create(createFields);
        await this._ownerRepository.save(owner);
        return owner;
    }
    async update(ownerUpdate: UpdateOwnerDto): Promise<IOwnerProps> {
        const owner = await this._ownerRepository.save(ownerUpdate);
        return owner;
    }

    async getById(ownerId: number): Promise<IOwnerProps | undefined> {
        const owner = await this._ownerRepository.findOne({ where: { id: ownerId } });
        return owner;
    }

    async getByAccountId(accountId: UUID): Promise<IOwner | undefined> {
        const owner = await this._ownerRepository.findOne({ where: { accountId } });
        return owner;
    }
}
