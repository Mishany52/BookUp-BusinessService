import { Injectable } from '@nestjs/common';
import { IAdministratorRepository } from './administrator.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministratorEntity } from './administrator.entity';
import { UpdateAdminDto } from '@/api/http/controllers/dto/administrator/update-admin.dto';
import { AdministratorDomainEntity } from '@/domains/administrator/administrator.domain-entity';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { UUID } from 'crypto';

@Injectable()
export class AdministratorRepository implements IAdministratorRepository {
    constructor(
        @InjectRepository(AdministratorEntity)
        private readonly _adminRepository: Repository<AdministratorEntity>,
    ) {}
    async create(createFields: AdministratorDomainEntity): Promise<IAdministratorProps> {
        return this._adminRepository.save(createFields);
    }
    async update(adminUpdate: UpdateAdminDto): Promise<IAdministratorProps> {
        const entity = await this._adminRepository.save(adminUpdate);
        return AdministratorDomainEntity.create(entity);
    }

    async getById(adminId: number): Promise<IAdministratorProps | undefined> {
        const entity = await this._adminRepository.findOne({ where: { id: adminId } });
        return AdministratorDomainEntity.create(entity);
    }

    async getByAccountId(accountId: UUID): Promise<IAdministratorProps> {
        return this._adminRepository.findOneBy({ accountId });
    }

    async getByBusinessId(businessId: number): Promise<IAdministratorProps[] | undefined> {
        const admins = await this._adminRepository.find({});

        if (!admins || admins.length === 0) {
            return;
        }

        return admins;
    }
}
