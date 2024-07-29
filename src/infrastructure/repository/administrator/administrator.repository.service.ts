import { Injectable } from '@nestjs/common';
import { IAdministratorRepository } from './administrator.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministratorEntity } from './administrator.entity';
import { IAdministratorDomainEntity } from '@/common/interface/administrator/administrator.interface';
import { AdminError } from '@/common/constants/http-messages/errors.constants';
import { UpdateAdminDto } from '@/api/http/controllers/dto/administrator/update-admin.dto';
import { CreateAdminDto } from '@/api/http/controllers/dto/administrator/create-admin.dto';

@Injectable()
export class AdministratorRepository implements IAdministratorRepository {
    constructor(
        @InjectRepository(AdministratorEntity)
        private readonly _adminRepository: Repository<AdministratorEntity>,
    ) {}
    async create(createFields: CreateAdminDto): Promise<IAdministratorDomainEntity> {
        try {
            const admin = this._adminRepository.create(createFields);
            await this._adminRepository.save(admin);
            //!Потом сменить на mapper
            const createdAdmin: IAdministratorDomainEntity = { ...admin };
            return createdAdmin;
        } catch (error) {
            throw new Error(AdminError.ADMIN_CREATION_FAILED);
        }
    }
    async update(adminUpdate: UpdateAdminDto): Promise<IAdministratorDomainEntity> {
        try {
            const admin = await this._adminRepository.save(adminUpdate);
            return admin;
        } catch (error) {
            throw new Error(AdminError.ADMIN_NOT_UPDATE);
        }
    }

    async getById(adminId: number): Promise<IAdministratorDomainEntity | undefined> {
        try {
            const admin = await this._adminRepository.findOne({ where: { id: adminId } });
            return admin;
        } catch (error) {
            throw new Error(AdminError.ADMIN_NOT_FOUND_BY_ID);
        }
    }
}
