import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '@/common/constants/auth.constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUUID, Length } from 'class-validator';
import { UUID } from 'crypto';

export class RequestAdminDto {
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
    readonly password: string;

    @ApiProperty({
        example: 'Иванов Иван Иванович',
    })
    @IsString()
    readonly fio: string;
    @IsOptional()
    readonly businessId: number;

    @IsOptional()
    @IsUUID()
    readonly pointIds: UUID[];
}
