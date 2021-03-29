export interface IMonthSection {
  year?: number;
  month?: number;
  monthName?: string;
  days?: ICalendarDay[];
  yearsRange?: number;
}

export interface ICalendarMonth {
  name: string;
  number: string;
  yearPosition: number;
  days: number[];
  weeks: any[];
}

export interface ICalendarDay {
  number?: number;
  name?: string;
  weekPosition?: number;
  month?: number;
  monthName?: string;
  year?: number;
  timestamp?: number;
  sideMonth?: boolean;
  disabled?: boolean;
  scheduled?: boolean;
  selected?: boolean;
}

export enum WeekDayNames {
  MONDAY = 'mon',
  TUESDAY = 'tue',
  WEDNESDAY = 'wed',
  THURSDAY = 'thu',
  FRIDAY = 'fri',
  SATURDAY = 'sat',
  SUNDAY = 'sun',
}

export enum MonthNames {
  JAN = 'JAN',
  FEB = 'FEB',
  MAR = 'MAR',
  APR = 'APR',
  MAY = 'MAY',
  JUN = 'JUN',
  JUL = 'JUL',
  AUG = 'AUG',
  SEP = 'SEP',
  OCT = 'OCT',
  NOV = 'NOV',
  DEC = 'DEC',
}

export enum ArrowValue {
  FORWARD = 1,
  BACK = -1,
}

export interface IMonthChange {
  currentMonthSection?: IMonthSection;
  arrow?: ArrowValue;
  picker?: IPickerValues;
}

export interface IPickerValues {
  month?: number;
  year?: number;
}

export interface ICalendarComponentProps {
  yearsRange?: number;
  daysToDisable?: number[];
  scheduledDays?: number[];
  weekDayNameLength?: number;
  modalCloseButton?: boolean;
  initialDate?: number[];
  selectedDay?: number;
}
