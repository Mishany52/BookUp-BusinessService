import { IDayWorkTime } from './dayWorkTime.interface';

export interface IWorkTimeProps {
    monday: IDayWorkTime;
    tuesday: IDayWorkTime;
    wednesday: IDayWorkTime;
    thursday: IDayWorkTime;
    friday: IDayWorkTime;
    saturday: IDayWorkTime;
    sunday: IDayWorkTime;
}
