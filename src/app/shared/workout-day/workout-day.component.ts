import { IWorkout } from './workout-day.models';
import { ICalendarDay } from './../calendar/calendar.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-workout-day',
  templateUrl: './workout-day.component.html',
  styleUrls: ['./workout-day.component.scss'],
})
export class WorkoutDayComponent implements OnInit {
  @Input() selectedDay: ICalendarDay;
  @Input() workTime: number[];
  @Input() workouts: IWorkout<any, any, any>[];

  constructor() {}

  ngOnInit() {}

  onDayChange(day: ICalendarDay) {
    this.selectedDay = day;
  }
}
