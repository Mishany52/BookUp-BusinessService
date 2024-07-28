import { Injectable } from '@nestjs/common';
import { IAdministratorRepository } from './administrator.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdministratorEntity } from './administrator.entity';
import { IAdministrator } from '@/domains/interface/administrator/administrator.interface';
import { UUID } from 'crypto';
import { AdminError } from '@/infrastructure/constants/http-messages/errors.constants';
import { UpdateAdminDto } from '@/api/http/controllers/dto/administrator/update-admin.dto';
import { CreateAdminDto } from '@/api/http/controllers/dto/administrator/create-admin.dto';

@Injectable()
export class AdministratorRepository implements IAdministratorRepository {
    constructor(
        @InjectRepository(AdministratorEntity)
        private readonly _adminRepository: Repository<AdministratorEntity>,
    ) {}
    async create(createFields: CreateAdminDto): Promise<IAdministrator> {
        try {
            const admin = this._adminRepository.create(createFields);
            await this._adminRepository.save(admin);
            //!Потом сменить на mapper
            const createdAdmin: IAdministrator = { ...admin };
            return createdAdmin;
        } catch (error) {
            throw new Error(AdminError.ADMIN_CREATION_FAILED);
        }
    }
    async update(adminUpdate: UpdateAdminDto): Promise<IAdministrator> {
        try {
            const admin = await this._adminRepository.save(adminUpdate);
            return admin;
        } catch (error) {
            throw new Error(AdminError.ADMIN_NOT_UPDATE);
        }
    }

    async getById(adminId: UUID): Promise<IAdministrator | undefined> {
        try {
            const admin = await this._adminRepository.findOne({ where: { id: adminId } });
            return admin;
        } catch (error) {
            throw new Error(AdminError.ADMIN_NOT_FOUND_BY_ID);
        }
    }
}
