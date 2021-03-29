import { IWorkout } from './../workout-day.models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  @Input() workout: IWorkout<any, any, any>;
  @Input() nextWorkout: IWorkout<any, any, any>;

  constructor() {}

  ngOnInit() {}

  setHeight() {
    console.log(
      `from${this.workout.startTime / 1000 / 60 / 60} to ${this.workout.endTime / 1000 / 60 / 60}, duration ${
        (this.workout.endTime - this.workout.startTime) / 1000 / 60 / 60
      }`
    );
    return `${((this.workout.endTime - this.workout.startTime) / 1000 / 60) * (80 / 60)}px`;
  }

  setMarginBottom() {
    return `${((this.nextWorkout.startTime - this.workout.endTime) / 1000 / 60) * (80 / 60)}px`;
  }
}
