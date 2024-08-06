import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '@/common/constants/auth.constants';
import { AccountRole } from '@/common/enums/account-role.enum';
import { IAccount } from '@/common/interface/account/account.interface';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateAccountDto implements IAccount {
    @IsEmail()
    email: string;
    @IsPhoneNumber('RU')
    phone: string;
    @MinLength(MIN_LENGTH_PASSWORD)
    @MaxLength(MAX_LENGTH_PASSWORD)
    password: string;
    @IsString()
    fio: string;
    @IsUrl()
    imgUrl?: string;
    @IsEnum(AccountRole)
    role: AccountRole;
    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
