import { IsString, Matches } from 'class-validator';

export class DayWorkTimeDto {
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Time must be in the format HH:MM',
    })
    start: string;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Time must be in the format HH:MM',
    })
    end: string;
}
