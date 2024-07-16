import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, IsUrl, IsUUID } from 'class-validator';
import { IOwner } from '../../../../domains/interface/owner/owner.interface';
import { IBusiness } from '@/domains/interface/business/business.interface';

export class OwnerUpdateDto implements IOwner {
    @IsEmail()
    @ApiProperty({
        uniqueItems: true,
        example: 'test@gmail.com',
    })
    email: string;
    @IsPhoneNumber('RU')
    @ApiProperty({
        uniqueItems: true,
        example: '+79000000000',
    })
    phone: string;
    @IsString()
    @IsUrl()
    @ApiProperty({
        example: 'пока не знаем',
    })
    imgUrl: string;
    @ApiProperty({
        example: 'Иванов Иван Иванович',
    })
    fio: string;
    @IsUUID()
    @ApiProperty({
        example: ['6b75fe4f-b5a5-4bda-95a2-b56ea489d608'],
    })
    businesses: IBusiness[];
    @ApiProperty({
        example: 'false',
    })
    archive: boolean;
}
