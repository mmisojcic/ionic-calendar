import { ICalendarDay, ArrowValue } from './../../calendar/calendar.models';
import { Injectable } from '@angular/core';
import { MomentService } from '../../services/moment.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDayService {
  constructor(private momentService: MomentService) {}

  getNewSelectedDayParams(arrowValue: ArrowValue, selectedDay: ICalendarDay): number[] {
    return this.momentService.getNext('day', arrowValue, selectedDay.timestamp);
  }

  getPresentDay(): number[] {
    return this.momentService.getDateValuesAsArray();
  }

  isToday(timestamp: number) {
    return this.momentService.isToday(timestamp);
  }

  generateTimelineHours(workTime: number[]): string[] {
    const [startTime, endTime] = workTime;
    const startTimeHH = startTime / 1000 / 60 / 60;
    const endTimeHH = endTime / 1000 / 60 / 60;
    const tmpHours = [];
    for (let i = startTimeHH; i <= endTimeHH; i++) {
      const min = '00';
      const hour = i.toString().length < 2 ? `0${i}` : i.toString();

      tmpHours.push(`${hour}:${min}`);
    }
    return tmpHours;
  }
}
