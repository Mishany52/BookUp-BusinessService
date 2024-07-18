import { ApiProperty } from '@nestjs/swagger';
import { IOwner } from '../../../../../domains/interface/owner/owner.interface';

export class AccountSingUpDto {
    @ApiProperty({ example: 'task_create_success' })
    message: string;
    @ApiProperty({
        example: {
            owner: {
                phone: '+79000000000',
                email: 'test@gmail.com',
                fio: 'Иванов Иван Иванович',
                imgUrl: 'пока не знаем',
                archive: 'false',
                businesses: ['3d2ae272-e2de-434f-84a6-733696506372'],
            },
        },
        nullable: true,
    })
    data: {
        task: IOwner;
    };
    @ApiProperty({ example: null, nullable: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: { [key: string]: any };
}
