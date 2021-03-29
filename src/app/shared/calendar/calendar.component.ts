import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IMonthSection, WeekDayNames, ICalendarDay, IMonthChange } from './calendar.models';
import { CalendarService } from './services/calendar.service';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  weekDayNames: string[];
  monthSection: IMonthSection;

  forwardSlidePt1: Animation;
  forwardSlidePt2: Animation;
  backSlidePt1: Animation;
  backSlidePt2: Animation;

  @Input() yearsRange: number;
  @Input() daysToDisable: number[];
  @Input() scheduledDays: number[];
  @Input() weekDayNameLength: number;
  @Input() modalCloseButton: boolean;
  @Input() initialDate: number[];
  @Input() selectedDay: number;

  @Output() selectDay = new EventEmitter<ICalendarDay>();

  @ViewChild('month', { static: false }) month: ElementRef;

  constructor(
    private calendarService: CalendarService,
    private animationCtrl: AnimationController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.setInitialSection();
    this.weekDayNames = Object.values(WeekDayNames);
  }

  ngAfterViewInit(): void {
    this.forwardSlidePt1 = this.animationCtrl
      .create()
      .addElement(this.month.nativeElement)
      .duration(200)
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateX(0)', 'translateX(100%)');
    this.forwardSlidePt2 = this.animationCtrl
      .create()
      .addElement(this.month.nativeElement)
      .duration(200)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)');

    this.backSlidePt1 = this.animationCtrl
      .create()
      .addElement(this.month.nativeElement)
      .duration(200)
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateX(0)', 'translateX(-100%)');
    this.backSlidePt2 = this.animationCtrl
      .create()
      .addElement(this.month.nativeElement)
      .duration(200)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateX(100%)', 'translateX(0)');
  }

  setInitialSection() {
    let initialYear, initialMonth;

    if (this.initialDate) {
      initialYear = this.initialDate[0];
      initialMonth = this.initialDate[1];
    } else {
      const [year, month] = this.calendarService.getPresentMonth();
      initialYear = year;
      initialMonth = month;
    }

    this.setCalendar(initialYear, initialMonth);
  }

  setCalendar(year: number, month: number) {
    const yearsRange = this.yearsRange === undefined ? 200 : this.yearsRange;
    this.monthSection = this.calendarService.generateMonthSection(
      year,
      month,
      yearsRange,
      this.daysToDisable,
      this.scheduledDays,
      this.selectedDay
    );
  }

  async onMonthChange(changeMonth: IMonthChange) {
    const [year, month, direction] = this.calendarService.getNewMonthSectionParams(changeMonth);
    await this.runAnimation(this[`${direction}SlidePt1`]);
    this.setCalendar(year, month);
    await this.runAnimation(this[`${direction}SlidePt2`]);
  }

  async runAnimation(animation: Animation) {
    await animation.play();
    animation.stop();
  }

  onSelectDay(day: ICalendarDay) {
    this.selectDay.emit(day);
    if (this.modalCloseButton) {
      this.closeModal(day);
    }
  }

  async closeModal(data) {
    await this.modalController.dismiss(data);
  }
}
