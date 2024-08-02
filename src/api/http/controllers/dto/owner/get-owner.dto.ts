import { IBusinessProps } from '@/common/interface/business/business.interface';
import { IOwnerProps } from '@/common/interface/owner/owner.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsPhoneNumber, IsUrl, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetOwnerDto {
    @IsNumber()
    @ApiProperty({
        example: '1',
    })
    id: number;

    @IsUUID()
    @ApiProperty({
        example: '6b75fe4f-b5a5-4bda-95a2-b56ea489d608',
    })
    accountId: UUID;

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
    businesses: IBusinessProps[];

    @ApiProperty({
        example: 'true',
    })
    active: boolean;

    constructor(model: IOwnerProps) {
        this.id = model.id;
        this.accountId = model.accountId;
        this.email = model.email;
        this.phone = model.phone;
        this.fio = model.fio;
        this.businesses = model.businesses;
        this.imgUrl = model.imgUrl;
        this.active = model.active;
    }
}
