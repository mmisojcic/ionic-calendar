import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private dateFormat = 'YYYY-MM-DD';

  constructor() {}

  getNext(unit: 'year' | 'month' | 'day', orientation?: number, timeValue?: number | number[]): number[] {
    return moment(timeValue).add(orientation, unit).toArray();
  }

  getDateValuesAsArray(timestamp?: number): number[] {
    return moment(timestamp).toArray();
  }

  getMonthName(month: number): string {
    return moment([month + 1], 'M').format('MMM');
  }

  getNumberOfDaysInMonth(year: number, month: number): number {
    return moment([year, month]).daysInMonth();
  }

  getWeekPosition(year: number, month: number, day: number): number {
    return moment([year, month, day]).day();
  }

  getRealWeekPosition(year: number, month: number, day: number) {
    const dayInWeek = this.getWeekPosition(year, month, day);
    return dayInWeek === 0 ? 7 : dayInWeek;
  }

  getTimestamp(year: number, month: number, day: number): number {
    return moment.utc([year, month, day]).valueOf();
  }

  getDateFromTimestamp(timestamp: number): string {
    return moment(timestamp).format(this.dateFormat);
  }

  isToday(timestamp: number): boolean {
    return moment().format(this.dateFormat) === moment(timestamp).format(this.dateFormat);
  }
}
