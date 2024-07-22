/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { IAccount } from '../../../../../domains/interface/account/account.interface';

export class GetAccountDto {
    @ApiProperty({ example: 'account_search_success' })
    message: string;
    @ApiProperty({
        example: {
            account: {
                phone: '+79000000000',
                email: 'example@gmail.com',
                role: 'owner',
                fio: 'Иванов Иван Иванович',
                imgUrl: 'пока не знаем',
            },
        },
        nullable: true,
    })
    data: {
        account: IAccount;
    };
    @ApiProperty({ example: 'null' })
    errors: { [key: string]: any };
}
