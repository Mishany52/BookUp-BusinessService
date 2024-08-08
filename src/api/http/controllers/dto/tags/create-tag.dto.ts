import { ITagProps } from '@/common/interface/tag/tag.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto implements ITagProps {
    @ApiProperty()
    @IsString()
    name: string;
}
