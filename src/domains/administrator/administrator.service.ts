import { GetAdminDto } from '@/api/http/controllers/dto/administrator/get-administrator.dto';
import { GetAdminDto } from '@/api/http/controllers/dto/administrator/get-administrator.dto';
import { IAdministratorRepository } from '@/infrastructure/repository/administrator/administrator.repository.interface';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountRole } from '../../common/enums/account-role.enum';
import { firstValueFrom } from 'rxjs';
import { ISsoServiceCheckByEmailPhoneResponse } from '../../common/interface/account/service-account-get-by-email-and-phone.interface';
import { IServiceAccountUpdateResponse } from '../../common/interface/account/service-account-update-by-id.interface';
import { AdminError, BusinessError } from '@/common/constants/http-messages/errors.constants';
import { IServiceAccountSingUpResponse } from '../../common/interface/account/service-account-sing-up.interface';
import { ISsoServiceCheckByEmailPhoneResponse } from '../../common/interface/account/service-account-get-by-email-and-phone.interface';
import { IServiceAccountUpdateResponse } from '../../common/interface/account/service-account-update-by-id.interface';
import { AdminError, BusinessError } from '@/common/constants/http-messages/errors.constants';
import { IServiceAccountSingUpResponse } from '../../common/interface/account/service-account-sing-up.interface';
import { Providers } from '@/common/constants/providers.constants';
import { SsoCmd } from '@/common/constants/sso-microservice-cmd.constants';
import { UUID } from 'crypto';
import { CheckAccountDto } from '@/common/dto/account/check-account.dto';
import { IAccount } from '@/common/interface/account/account.interface';
import { RequestCreateAdminDto } from '@/api/http/controllers/dto/administrator/request-admin.dto';
import { AdministratorDomainEntity } from './administrator.domain-entity';
import { IAdministratorProps } from '@/common/interface/administrator/administrator.interface';
import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IPointProps } from '@/common/interface/point/point.interface';
import { BusinessService } from '../business/business.service';
import { isEmptyObject } from '@/common/utils/is-empty-object';

const adminRepo = () => Inject(Providers.ADMIN_REPO);
const ssoService = () => Inject(Providers.SSO);
@Injectable()
export class AdministratorService {
    constructor(
        private readonly _businessService: BusinessService,
        @adminRepo() private readonly _adminRepository: IAdministratorRepository,
        @ssoService() private readonly _ssoServiceClient: ClientProxy,
    ) {}

    async create(adminDto: RequestCreateAdminDto): Promise<GetAdminDto> {
        const accountRequest = {
            email: adminDto.email,
            phone: adminDto.phone,
            role: AccountRole.admin,
            password: adminDto.password,
            fio: adminDto.fio,
        } as IAccount;
        const business = await this._getBusinessById(adminDto.businessId);
        //! На точки тоже получение сделать
        const points = undefined;
        const checkAccount = await this._checkAccountByEmailAndPhone(
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
        await this._deactivateAccount(admin.accountId);

        try {
            const adminUpdated = await this._adminRepository.update(admin);
            return adminUpdated.getDto();
        } catch (e) {
            throw new HttpException(
                AdminError.ADMIN_DEACTIVATE_FAILED,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getAdminById(adminId: number): Promise<GetAdminDto> {
        const admin = await this._adminRepository.getById(adminId);
        if (!admin) {
            throw new HttpException(AdminError.ADMIN_NOT_FOUND_BY_ID, HttpStatus.NOT_FOUND);
        }
        return admin.getDto();
    }

    private async _deactivateAccount(accountId: UUID) {
        const response: IServiceAccountSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: SsoCmd.DEACTIVATE_ACCOUNT_BY_ID,
                },
                accountId,
            ),
        );
        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: response.message,
                    errors: response.errors,
                    data: null,
                },
                response.status,
            );
        }
    }

    private async _updateAccountRole(accountId: UUID): Promise<IServiceAccountUpdateResponse> {
        const responseUpdate = await firstValueFrom(
            this._ssoServiceClient.send(
                {
                    cmd: SsoCmd.UPDATE_ACCOUNT_BY_ID,
                },
                { id: accountId, role: AccountRole.admin },
            ),
        );

        if (responseUpdate.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: responseUpdate.message,
                    errors: responseUpdate.errors,
                    data: null,
                },
                responseUpdate.status,
            );
        }
        return responseUpdate;
    }

    private async _checkAccountByEmailAndPhone(
        email: string,
        phone: string,
    ): Promise<CheckAccountDto> {
        const response: ISSOServiceCheckByEmailPhoneResponse = await firstValueFrom(
            this._ssoServiceClient.send(
                { cmd: SsoCmd.CHECK_ACCOUNT_BY_EMAIL_AND_PHONE },
                { email, phone },
            ),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(response.message, response.status);
        }

        return response.data;
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

        const accountUpdated = await this._updateAccountRole(account.id);
        const adminProps = this._convertAccountToAdmin(accountUpdated.data, business, points);
        const admin = AdministratorDomainEntity.create(adminProps);

        try {
            const adminEntity = await this._adminRepository.create(admin);
            return adminEntity.getDto();
        } catch (e) {
            throw new HttpException(AdminError.ADMIN_CREATION_FAILED, HttpStatus.BAD_REQUEST);
        }
    }

    private async _singUp(accountFields: IAccount): Promise<IAccount> {
        const response: ISSOServiceSingUpResponse = await firstValueFrom(
            this._ssoServiceClient.send({ cmd: SsoCmd.SING_UP }, accountFields),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: response.message,
                    errors: response.errors,
                    data: null,
                },
                response.status,
            );
        }
        return response.data;
    }

    private async _createNewAdminAndAccount(adminRequest: IAccount): Promise<GetAdminDto> {
        const account = await this._singUp(adminRequest);
        const createOwnerDto = new CreateAdminDto(account);

        try {
            return new GetAdminDto(await this._adminRepository.create(createOwnerDto));
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

    private async _getBusinessById(businessId: number): Promise<IBusinessProps> {
        const business = await this._businessService.getById(businessId);
        if (isEmptyObject(business)) {
            throw new HttpException(BusinessError.BUSINESS_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        return business;
    }
}
