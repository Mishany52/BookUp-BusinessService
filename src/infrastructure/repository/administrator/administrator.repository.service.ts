import { Injectable } from '@nestjs/common';
import { IAdministratorRepository } from './administrator.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministratorEntity } from './administrator.entity';
import { IAdministratorDomainEntity } from '@/common/interface/administrator/administrator.interface';
import { UpdateAdminDto } from '@/api/http/controllers/dto/administrator/update-admin.dto';
import { CreateAdminDto } from '@/api/http/controllers/dto/administrator/create-admin.dto';
import { UUID } from 'crypto';

@Injectable()
export class AdministratorRepository implements IAdministratorRepository {
    constructor(
        @InjectRepository(AdministratorEntity)
        private readonly _adminRepository: Repository<AdministratorEntity>,
    ) {}
    async create(createFields: CreateAdminDto): Promise<IAdministratorDomainEntity> {
        const admin = this._adminRepository.create(createFields);
        await this._adminRepository.save(admin);
        //!Потом сменить на mapper
        const createdAdmin: IAdministratorDomainEntity = { ...admin };
        return createdAdmin;
    }
    async update(adminUpdate: UpdateAdminDto): Promise<IAdministratorDomainEntity> {
        const admin = await this._adminRepository.save(adminUpdate);
        return admin;
    }

    async getById(adminId: number): Promise<IAdministratorDomainEntity | undefined> {
        const admin = await this._adminRepository.findOne({ where: { id: adminId } });
        return admin;
    }

    async getByAccountId(accountId: UUID): Promise<IAdministratorDomainEntity> {
        return this._adminRepository.findOneBy({ accountId });
    }
}
