import { GetAdminDto } from '@/api/http/controllers/dto/administrator/get-administrator.dto';
import { GetAdminDto } from '@/api/http/controllers/dto/administrator/get-administrator.dto';
import { IAdministratorRepository } from '@/infrastructure/repository/administrator/administrator.repository.interface';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { AccountRole } from '../../common/enums/account-role.enum';
import { AdminError, BusinessError } from '@/common/constants/http-messages/errors.constants';
import { Providers } from '@/common/constants/providers.constants';
import { CheckAccountDto } from '@/common/dto/account/check-account.dto';
import { IAccount } from '@/common/interface/sso/account/account.interface';
import { RequestCreateAdminDto } from '@/api/http/controllers/dto/administrator/request-admin.dto';
import { AdministratorDomainEntity } from './administrator.domain-entity';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { BusinessService } from '../business/business.service';
import { UpdateAdminDto } from '@/api/http/controllers/dto/administrator/update-admin.dto';
import { getUpdateFields } from '@/common/utils/get-update-fields';
import { IAccountServicePort } from '@/infrastructure/ports/account-service.port';
import { IAuthServicePort } from '@/infrastructure/ports/auth-service.port';
import { SignUpDto } from '@/api/http/controllers/dto/auth/sing-up.dto';
const adminRepo = () => Inject(Providers.ADMIN_REPO);
const accountService = () => Inject(Providers.ACCOUNT_SERVICE);
const authService = () => Inject(Providers.AUTH_SERVICE);
@Injectable()
export class AdministratorService {
    constructor(
        private readonly _businessService: BusinessService,
        @adminRepo() private readonly _adminRepository: IAdministratorRepository,
        @accountService() private readonly _accountService: IAccountServicePort,
        @authService() private readonly _authService: IAuthServicePort,
    ) {}

    async create(adminDto: RequestCreateAdminDto): Promise<GetAdminDto> {
        const accountRequest = {
            email: adminDto.email,
            phone: adminDto.phone,
            role: AccountRole.admin,
            password: adminDto.password,
            fio: adminDto.fio,
        } as SignUpDto;
        const business = await this._businessService.getById(adminDto.businessId);
        //! На точки тоже получение сделать
        const points = undefined;
        const checkAccount = await this._accountService.checkByEmailAndPhone(
            adminDto.email,
            adminDto.phone,
        );

        if (checkAccount.account) {
            return this._createAdminByExistingAccount(checkAccount.account, business, points);
        }

        if (!checkAccount.emailTaken && !checkAccount.phoneTaken) {
            return this._createNewAdminAndAccount(accountRequest, business, points);
        }

        this._exceptionEmailOrPhoneBusy(checkAccount);

        throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async deactivate(adminId: number): Promise<GetAdminDto> {
        const admin = await this.getAdminById(adminId);

        Object.assign(admin, { active: false });
        await this._accountService.deactivate(admin.accountId);

        try {
            const adminUpdateEntity = await this._adminRepository.update(admin);
            const adminDomainEntity = AdministratorDomainEntity.create(adminUpdateEntity);
            return adminDomainEntity.getDto();
        } catch (e) {
            throw new HttpException(
                AdminError.ADMIN_DEACTIVATE_FAILED,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getAdminById(adminId: number): Promise<GetAdminDto> {
        const adminEntity = await this._adminRepository.getById(adminId);
        if (!adminEntity) {
            throw new HttpException(AdminError.ADMIN_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
        }
        const adminDomainEntity = AdministratorDomainEntity.create(adminEntity);
        return adminDomainEntity.getDto();
    }

    async update(adminId: number, adminUpdateDto: Partial<UpdateAdminDto>): Promise<GetAdminDto> {
        const adminEntity = await this._adminRepository.getById(adminId);
        if (!adminEntity) {
            throw new HttpException(AdminError.ADMIN_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
        }
        adminUpdateDto = await getUpdateFields(adminEntity, adminUpdateDto);
        const adminUpdateEntity = await this._adminRepository.update(adminUpdateDto);
        const adminDomainEntity = AdministratorDomainEntity.create(adminUpdateEntity);
        return adminDomainEntity.getDto();
    }

    private async _createAdminByExistingAccount(
        account: IAccount,
        business: IBusinessProps,
        points?: IPointProps[],
    ): Promise<GetAdminDto> {
        if (account.role === AccountRole.admin || account.role === AccountRole.owner) {
            throw new HttpException(
                AdminError.ADMIN_OR_OWNER_ALREADY_CREATED,
                HttpStatus.BAD_REQUEST,
            );
        }

        const accountUpdated = await this._accountService.update(account.id, {
            role: AccountRole.admin,
        });
        const adminProps = this._convertAccountToAdmin(accountUpdated, business, points);
        const admin = AdministratorDomainEntity.create(adminProps);

        try {
            const adminEntity = await this._adminRepository.create(admin);
            const adminDomainEntity = AdministratorDomainEntity.create(adminEntity);
            return adminDomainEntity.getDto();
        } catch (e) {
            throw new HttpException(AdminError.ADMIN_CREATION_FAILED, HttpStatus.BAD_REQUEST);
        }
    }

    private async _createNewAdminAndAccount(
        account: SignUpDto,
        business: IBusinessProps,
        points: IPointProps[],
    ): Promise<GetAdminDto> {
        const accountCreated = await this._authService.singUp(account);
        const adminProp = this._convertAccountToAdmin(accountCreated, business, points);
        const admin = AdministratorDomainEntity.create(adminProp);
        try {
            const adminEntity = await this._adminRepository.create(admin);
            const adminDomainEntity = AdministratorDomainEntity.create(adminEntity);
            return adminDomainEntity.getDto();
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    private _exceptionEmailOrPhoneBusy(checkAccount: CheckAccountDto): void {
        if (checkAccount.emailTaken) {
            throw new HttpException(AdminError.EMAIL_IS_BUSY, HttpStatus.BAD_REQUEST);
        }

        if (checkAccount.phoneTaken) {
            throw new HttpException(AdminError.PHONE_IS_BUSY, HttpStatus.BAD_REQUEST);
        }
    }

    private _convertAccountToAdmin(
        account: IAccount,
        business: IBusinessProps,
        points?: IPointProps[],
    ): IAdministratorProps {
        return {
            accountId: account.id,
            email: account.email,
            phone: account.phone,
            fio: account.fio,
            active: account.active,
            imgUrl: account.imgUrl,
            business: business,
            points: points,
        };
    }

    private async _checkBusiness(businessId: number): Promise<void> {
        const isBusiness = await this._businessService.existByID(businessId);
        if (isBusiness) {
            throw new HttpException(BusinessError.BUSINESS_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
    }
}
