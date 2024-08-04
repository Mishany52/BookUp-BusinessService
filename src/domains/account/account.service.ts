import { AccountRole } from '@/common/enums/account-role.enum';
import { AdministratorService } from '../administrator/administrator.service';
import { OwnerService } from '../owner/owner.service';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AccountGetInfoDto } from '@/api/http/controllers/dto/response/account-get-info.dto';

@Injectable()
export class AccountService {
    constructor(
        private readonly _ownerService: OwnerService,
        private readonly _administratorService: AdministratorService,
    ) {}

    async getInfo(user: { accountId: UUID; role: AccountRole }) {
        let accountInfo = null;
        switch (user.role) {
            case AccountRole.admin:
                accountInfo = await this._administratorService.getByAccountId(user.accountId);
                break;
            case AccountRole.owner:
                accountInfo = await this._ownerService.getOwnerByAccountId(user.accountId);
                break;
        }
        return plainToClass(
            AccountGetInfoDto,
            { ...accountInfo, role: user.role },
            { excludeExtraneousValues: true },
        );
    }
}
