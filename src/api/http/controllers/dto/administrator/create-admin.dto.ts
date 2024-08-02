import { IAccount } from '@/common/interface/account/account.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateAdminDto {
    @ApiProperty({
        uniqueItems: true,
        example: '1',
    })
    @IsNumber()
    businessId: number;

    @ApiProperty({
        uniqueItems: true,
        example: '956c0d26-9d40-46a3-a8a5-2577741ef38c',
    })
    @IsUUID()
    accountId: UUID;

    @ApiProperty({
        uniqueItems: true,
        example: '+79000000000',
    })
    @IsPhoneNumber('RU')
    readonly phone: string;

    @ApiProperty({
        uniqueItems: true,
        example: 'test@gmail.com',
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: 'Иванов Иван Иванович',
    })
    @IsString()
    readonly fio: string;

    constructor(accountDto: IAccount) {
        this.accountId = accountDto.id;
        this.phone = accountDto.phone;
        this.email = accountDto.email;
        this.fio = accountDto.fio;
    }
}
