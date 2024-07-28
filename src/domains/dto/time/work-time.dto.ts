import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DayWorkTimeDto } from './day-work-time.dto';
import { IWorkTime } from 'src/domains/interface/time/workTime.interface';

export class WorkTimeDto implements IWorkTime {
    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    понедельник: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    вторник: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    среда: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    четверг: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    пятница: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    суббота: DayWorkTimeDto;

    @ValidateNested()
    @Type(() => DayWorkTimeDto)
    воскресенье: DayWorkTimeDto;
}
