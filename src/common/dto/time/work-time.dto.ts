import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DayWorkTimeDto } from './day-work-time.dto';
import { IWorkTimeProps } from '@/common/interface/time/work-time.interface';

export class WorkTimeDto implements IWorkTimeProps {
    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    monday: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    tuesday: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    wednesday: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    thursday: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    friday: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    saturday: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    sunday: DayWorkTimeDto;
}
