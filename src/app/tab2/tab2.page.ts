import { CalendarService } from './../shared/calendar/services/calendar.service';
import { Component } from '@angular/core';
import { ICalendarDay } from '../shared/calendar/calendar.models';
import { IWorkout } from '../shared/workout-day/workout-day.models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  workouts: IWorkout<any, any, any>[] = [
    {
      startTime: 28800000,
      endTime: 32400000,
    },
    {
      startTime: 41400000,
      endTime: 46800000,
    },
    {
      startTime: 46800000,
      endTime: 50400000,
    },
    {
      startTime: 54000000,
      endTime: 62280000,
    },
    {
      startTime: 63000000,
      endTime: 68400000,
    },
    {
      startTime: 68400000,
      endTime: 72000000,
    },
  ];

  selectedDay;
  constructor(private calendarService: CalendarService) {
    this.selectedDay = this.calendarService.generateDay(2020, 11, 25);
    console.log('day', this.selectedDay);
  }
  onDayChange(day: ICalendarDay) {
    this.selectedDay = day;
  }
}
