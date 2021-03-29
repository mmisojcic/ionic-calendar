import { WorkoutDayService } from './../services/workout-day.service';
import { ICalendarDay } from './../../calendar/calendar.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from '../../calendar/calendar.component';
import { ArrowValue, ICalendarComponentProps } from '../../calendar/calendar.models';
import { CalendarService } from '../../calendar/services/calendar.service';

@Component({
  selector: 'app-workout-day-header',
  templateUrl: './workout-day-header.component.html',
  styleUrls: ['./workout-day-header.component.scss'],
})
export class WorkoutDayHeaderComponent implements OnInit {
  arrow = ArrowValue;

  @Input() selectedDay: ICalendarDay;
  @Output() dayChange = new EventEmitter<ICalendarDay>();

  constructor(
    private modalController: ModalController,
    private calendarService: CalendarService,
    private workoutDayService: WorkoutDayService
  ) {}

  ngOnInit() {}

  async onOpenCalendar() {
    const componentProps: ICalendarComponentProps = {
      modalCloseButton: true,
      yearsRange: 2,
      initialDate: [this.selectedDay.year, this.selectedDay.month],
      selectedDay: this.selectedDay.timestamp,
    };
    const modal = await this.modalController.create({
      component: CalendarComponent,
      swipeToClose: true,
      componentProps,
    });
    modal.onWillDismiss().then((modalData) => {
      if (modalData.data) {
        this.dayChange.emit(modalData.data);
      }
    });
    return await modal.present();
  }

  onChangeDay(arrow: ArrowValue) {
    const [year, month, number] = this.workoutDayService.getNewSelectedDayParams(arrow, this.selectedDay);
    const newDay = this.calendarService.generateDay(year, month, number);
    this.dayChange.emit(newDay);
  }
  onPresentDay() {
    const [year, month, day] = this.workoutDayService.getPresentDay();
    const newDay = this.calendarService.generateDay(year, month, day);
    this.dayChange.emit(newDay);
  }

  isToday() {
    return this.workoutDayService.isToday(this.selectedDay.timestamp);
  }

  setWorkoutDayTitle() {
    const { monthName, name, number } = this.selectedDay;
    return this.isToday() ? 'Today' : `${monthName}, ${name} ${number}`;
  }
}
