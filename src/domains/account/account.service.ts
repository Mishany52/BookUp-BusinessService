import { AccountRole } from '@/common/enums/account-role.enum';
import { AdministratorService } from '../administrator/administrator.service';
import { OwnerService } from '../owner/owner.service';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
    constructor(
        private readonly _ownerService: OwnerService,
        private readonly _administratorService: AdministratorService,
    ) {}

    async getInfo(user: { accountId: UUID; role: AccountRole }) {
        switch (user.role) {
            case AccountRole.admin:
                return this._administratorService.getByAccountId(user.accountId);
            case AccountRole.owner:
                return this._ownerService.getOwnerByAccountId(user.accountId);
        }
    }
}
