import { IAccount } from '@/common/interface/sso/account/account.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreatedAdminDto {
    @ApiProperty({
        uniqueItems: true,
        example: 'test@gmail.com',
    })
    email: string;
    @ApiProperty({
        uniqueItems: true,
        example: '+79000000000',
    })
    phone: string;

    @ApiProperty({
        example: 'Иванов Иван Иванович',
    })
    fio: string;

    constructor(model: IAccount) {
        this.email = model.email;
        this.phone = model.phone;
        this.fio = model.fio;
    }
}
