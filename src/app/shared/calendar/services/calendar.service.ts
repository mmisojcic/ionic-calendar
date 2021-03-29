import { IMonthChange, IMonthSection, ArrowValue, WeekDayNames } from './../calendar.models';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { ICalendarDay } from '../calendar.models';
import { MomentService } from '../../services/moment.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private momentService: MomentService) {}

  generateMonthSection(
    year: number,
    month: number,
    yearsRange: number,
    daysToDisable?: number[],
    scheduledDays?: number[],
    selectedDay?: number
  ): IMonthSection {
    const [prevYear, prevMonth] = this.momentService.getNext('month', -1, [year, month, 1]);
    const [nextYear, nextMonth] = this.momentService.getNext('month', 1, [year, month, 1]);

    const prevMonthDays = this.generateMonthDays(prevYear, prevMonth, month, daysToDisable, scheduledDays, selectedDay);
    const mainMonthDays = this.generateMonthDays(year, month, month, daysToDisable, scheduledDays, selectedDay);
    const nextMonthDays = this.generateMonthDays(nextYear, nextMonth, month, daysToDisable, scheduledDays, selectedDay);

    const monthsAggregate = [...prevMonthDays, ...mainMonthDays, ...nextMonthDays];
    const sectionStartIndex = this.getSectionStartingIndex(monthsAggregate, month);
    const days = monthsAggregate.slice(sectionStartIndex, sectionStartIndex + 42);

    const monthName = this.momentService.getMonthName(month).toLowerCase();

    return {
      year,
      month,
      monthName,
      days,
      yearsRange,
    };
  }

  generateMonthDays(
    year: number,
    month: number,
    currentSetMonth: number,
    daysToDisable: number[],
    scheduledDays?: number[],
    selectedDay?: number
  ): ICalendarDay[] {
    const daysInMonth = this.momentService.getNumberOfDaysInMonth(year, month);

    return [...Array(daysInMonth).keys()].reduce((calendarDays, key) => {
      const dayInMonth = key + 1;

      calendarDays.push(this.generateDay(year, month, dayInMonth, currentSetMonth, daysToDisable, scheduledDays, selectedDay));
      return calendarDays;
    }, []);
  }

  generateDay(
    year: number,
    month: number,
    number: number,
    currentSetMonth?: number,
    daysToDisable?: number[],
    scheduledDays?: number[],
    selectedDay?: number
  ): ICalendarDay {
    const weekPosition = this.momentService.getRealWeekPosition(year, month, number);
    const timestamp = this.momentService.getTimestamp(year, month, number);
    const name = Object.values(WeekDayNames)[weekPosition - 1];
    const monthName = this.momentService.getMonthName(month);

    return {
      number,
      name,
      weekPosition,
      month,
      monthName,
      year,
      timestamp,
      sideMonth: month !== currentSetMonth,
      disabled: this.dayExists(timestamp, daysToDisable),
      scheduled: this.dayExists(timestamp, scheduledDays),
      selected: selectedDay === timestamp,
    };
  }

  getSectionStartingIndex(monthsAggregate: ICalendarDay[], mainMonth: number): number {
    let sectionStartIndex;

    monthsAggregate.forEach((day, i) => {
      if (day.number === 1 && day.month === mainMonth) {
        const weekDayDifference = day.weekPosition - 1;
        sectionStartIndex = i - weekDayDifference;
      }
    });

    return sectionStartIndex;
  }

  getPresentMonth(): number[] {
    return this.momentService.getDateValuesAsArray();
  }

  dayExists(timestamp: number, datesToCheck: number[]) {
    if (!datesToCheck) return false;
    const dateOfProcessingDay = this.momentService.getDateFromTimestamp(timestamp);

    return datesToCheck.find((date) => this.momentService.getDateFromTimestamp(date) === dateOfProcessingDay) ? true : false;
  }

  isToday(day: ICalendarDay): boolean {
    return this.momentService.isToday(day.timestamp);
  }

  isSunday(weekPosition: number): boolean {
    return weekPosition === 7;
  }

  generateYearsFromRange(yearRange: number): number[] {
    const startYear = moment().year() - yearRange;
    const endYear = moment().year() + yearRange;
    const years: number[] = [];

    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }

    return years;
  }

  getNewMonthSectionParams(changeMonth: IMonthChange): any[] {
    const { arrow, picker, currentMonthSection } = changeMonth;
    const { year, month } = currentMonthSection;

    const newMonthSectionParams = [];

    if (arrow === ArrowValue.FORWARD) {
      month === 11 ? newMonthSectionParams.push(year + 1, 0, 'back') : newMonthSectionParams.push(year, month + 1, 'back');
    }
    if (arrow === ArrowValue.BACK) {
      month === 0 ? newMonthSectionParams.push(year - 1, 11, 'forward') : newMonthSectionParams.push(year, month - 1, 'forward');
    }

    if (picker) {
      const slide = this.setPickerSlide(changeMonth);
      newMonthSectionParams.push(picker.year, picker.month, slide);
    }

    return newMonthSectionParams;
  }

  setPickerSlide(changeMonth: IMonthChange): string {
    const { picker, currentMonthSection } = changeMonth;
    const pickerDate = this.momentService.getTimestamp(picker.year, picker.month, 1);
    const currentlySetDate = this.momentService.getTimestamp(currentMonthSection.year, currentMonthSection.month, 1);
    return pickerDate > currentlySetDate ? 'back' : 'forward';
  }

  setWeekDayNames(nameLength: number): string[] {
    if (!nameLength || nameLength < 1 || nameLength > 3) {
      return Object.values(WeekDayNames);
    }
    return Object.values(WeekDayNames).map((dayName) => dayName.substr(0, nameLength));
  }
}
