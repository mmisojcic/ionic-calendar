import { ICalendarDay } from '../calendar.models';
import { CalendarService } from '../services/calendar.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() day: ICalendarDay;
  @Output() selectDay = new EventEmitter<ICalendarDay>();

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {}

  isToday(): boolean {
    return this.calendarService.isToday(this.day);
  }

  isSunday(): boolean {
    return this.calendarService.isSunday(this.day.weekPosition);
  }

  onDay() {
    if (this.day.disabled) return;
    this.selectDay.emit(this.day);
  }
}
