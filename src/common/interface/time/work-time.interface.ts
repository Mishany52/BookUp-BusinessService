import { IDayWorkTime } from './day-work-time.interface';

export interface IWorkTimeProps {
    monday: IDayWorkTime;
    tuesday: IDayWorkTime;
    wednesday: IDayWorkTime;
    thursday: IDayWorkTime;
    friday: IDayWorkTime;
    saturday: IDayWorkTime;
    sunday: IDayWorkTime;
}
