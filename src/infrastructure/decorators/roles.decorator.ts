/* eslint-disable @typescript-eslint/naming-convention */
import { AccountRole } from '@/common/enums/account-role.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: AccountRole[]) => SetMetadata('roles', roles);
