import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-week-days',
  templateUrl: './calendar-week-days.component.html',
  styleUrls: ['./calendar-week-days.component.scss'],
})
export class WeekDaysComponent implements OnInit {
  weekDayNames: string[];

  @Input() set weekDayNameLength(nameLength: number) {
    this.weekDayNames = this.calendarService.setWeekDayNames(nameLength);
  }

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {}
}
