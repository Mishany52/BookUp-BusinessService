import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, IsUUID, Length } from 'class-validator';
import {
    MAX_LENGTH_PASSWORD,
    MIN_LENGTH_PASSWORD,
} from '../../../../infrastructure/constants/auth.constants';

export class CreateOwnerDto {
    @ApiProperty({
        uniqueItems: true,
        example: '956c0d26-9d40-46a3-a8a5-2577741ef38c',
    })
    @IsUUID()
    accountId: string;
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
        minLength: MIN_LENGTH_PASSWORD,
        example: 'testTest',
    })
    @IsString()
    @Length(MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD, {
        message: `Не меньше ${MIN_LENGTH_PASSWORD} и не больше ${MAX_LENGTH_PASSWORD}`,
    })
    readonly password?: string;

    @ApiProperty({
        example: 'Иванов Иван Иванович',
    })
    @IsString()
    readonly fio: string;
}
