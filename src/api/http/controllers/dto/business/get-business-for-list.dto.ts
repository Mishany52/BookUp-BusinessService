import { IBusinessProps } from '@/common/interface/business/business.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetBusinessCountAllWorkersDto {
    @ApiProperty()
    @IsNumber()
    id: number;
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    logoUrl: string;
    @ApiProperty()
    @IsNumber()
    pointCount: number;
    @ApiProperty()
    @IsNumber()
    adminCount: number;
    @ApiProperty()
    @IsNumber()
    managerCount: number;
    constructor(props: IBusinessProps) {
        this.id = props.id;
        this.name = props.name;
        this.logoUrl = props.logoUrl;
        this.pointCount = props.points ? props.points.length : 0;
        this.adminCount = props.administrators ? props.administrators.length : 0;
        this.managerCount = props.managers ? props.managers.length : 0;
    }
}
