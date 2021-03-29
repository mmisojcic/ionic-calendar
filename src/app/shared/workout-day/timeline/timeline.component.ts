import { WorkoutDayService } from './../services/workout-day.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  timelineHours: any[];

  @Input() workTime: number[];

  constructor(private workoutDayService: WorkoutDayService) {}

  ngOnInit() {
    this.timelineHours = this.workoutDayService.generateTimelineHours(this.workTime);
  }
}
