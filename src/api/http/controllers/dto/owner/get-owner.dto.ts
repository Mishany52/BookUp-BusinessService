import { IBusiness } from '@/domains/interface/business/business.interface';
import { IOwner } from '@/domains/interface/owner/owner.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsUrl, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetOwnerDto {
    @IsUUID()
    @ApiProperty({
        example: '6b75fe4f-b5a5-4bda-95a2-b56ea489d608',
    })
    id: UUID;
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
    businesses: IBusiness[];
    @ApiProperty({
        example: 'true',
    })
    active: boolean;

    constructor(model: IOwner) {
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
