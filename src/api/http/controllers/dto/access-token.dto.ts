import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';
export class AccessTokenDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @IsJWT()
    readonly accessToken: string;
    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}
