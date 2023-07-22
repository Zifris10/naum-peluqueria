import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TIMEZONES } from './';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(TIMEZONES.MX);

export const dayjsSetStartDate = (date: Date): Date => {
    const setDate: Date = dayjs(date).startOf('day').toDate();
    return setDate;
};

export const dayjsSetEndDate = (date: string): Date => {
    const setDate: Date = dayjs(date).endOf('day').toDate();
    return setDate;
};

export const dayjsGetCurrentDate = (date?: string): Date => {
    const getDate: Date = dayjs(date).toDate();
    return getDate;
};

export const dayjsSubtractDays = (date: Date, days: number): Date => {
    const setDate: Date = dayjs(date).subtract(days, 'day').toDate();
    return setDate;
};