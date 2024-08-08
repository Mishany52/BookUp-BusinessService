import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '@/common/constants/auth.constants';
import { AccountRole } from '@/common/enums/account-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignUpDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: '+79000000000', description: 'Номер телефона' })
    @IsString({ message: 'Должно быть строкой' })
    @IsPhoneNumber('RU')
    readonly phone: string;

    @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
    @IsString()
    readonly fio: string;

    @ApiProperty({ example: 'password', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD, {
        message: `Не меньше ${MIN_LENGTH_PASSWORD} и не больше ${MAX_LENGTH_PASSWORD}`,
    })
    password: string;
    @ApiProperty({ example: 'owner', description: 'Роль пользователя' })
    @IsEnum(AccountRole)
    readonly role: AccountRole;
}
