import { IDayWorkTime } from './dayWorkTime.interface';

export interface IWorkTime {
    понедельник: IDayWorkTime;
    вторник: IDayWorkTime;
    среда: IDayWorkTime;
    четверг: IDayWorkTime;
    пятница: IDayWorkTime;
    суббота: IDayWorkTime;
    воскресенье: IDayWorkTime;
}
