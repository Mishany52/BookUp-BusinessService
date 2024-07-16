import { CreateOwnerDto } from '@/api/http/controllers/dto/create-owner.dto';
import { GetOwnerDto } from '@/api/http/controllers/dto/get-owner.dto';
import { IOwnerRepository } from '@/infrastructure/repository/owner/owner.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

const ownerRepo = () => Inject('ownerRepo');
@Injectable()
export class OwnerService {
    constructor(@ownerRepo() private readonly _ownerRepository: IOwnerRepository) {}

    async create(ownerDto: CreateOwnerDto): Promise<GetOwnerDto> {
        const newOwner = await this._ownerRepository.create(ownerDto);
        const getOwnerDto = new GetOwnerDto(newOwner);
        return getOwnerDto;
    }
}
