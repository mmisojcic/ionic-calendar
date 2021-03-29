import { IMonthChange, IMonthSection, ArrowValue, MonthNames } from './../calendar.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerColumn } from '@ionic/core';
import moment from 'moment';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
})
export class CalendarHeaderComponent implements OnInit {
  arrow = ArrowValue;

  @Input() monthSection: IMonthSection;
  @Output() monthChange = new EventEmitter<IMonthChange>();

  constructor(private calendarService: CalendarService, private pickerController: PickerController) {}

  ngOnInit() {}

  onChangeMonth(arrow: ArrowValue) {
    this.monthChange.emit({
      currentMonthSection: this.monthSection,
      arrow,
    });
  }
  onPresentMonth() {
    const [year, month] = this.calendarService.getPresentMonth();
    if (this.monthSection.year === year && this.monthSection.month === month) return;
    this.monthChange.emit({
      currentMonthSection: this.monthSection,
      picker: {
        year,
        month,
      },
    });
  }

  async showPicker() {
    const picker = await this.pickerController.create(this.generatePickerOptions());
    picker.present();
  }

  generatePickerOptions(): PickerOptions {
    const { year, yearsRange, month } = this.monthSection;
    const years = this.calendarService.generateYearsFromRange(yearsRange);
    const columns: PickerColumn[] = [
      {
        name: 'month',
        options: Object.values(MonthNames).map((monthName, i) => ({ text: monthName, value: i })),
        selectedIndex: month,
      },
      {
        name: 'year',
        options: years.map((val) => ({ text: val.toString(), value: val })),
        selectedIndex: this.setYearSelectedIndex(yearsRange, year),
      },
    ];

    const options: PickerOptions = {
      columns,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (pickerOutput: PickerSelectValue) => {
            const { year: currentlySetYear, month: currentlySetMonth } = this.monthSection;
            const { year, month } = pickerOutput;
            if (currentlySetYear === year.value && currentlySetMonth === month.value) return;

            this.monthChange.emit({
              currentMonthSection: this.monthSection,
              picker: {
                year: year.value,
                month: month.value,
              },
            });
          },
        },
      ],
    };
    return options;
  }

  setYearSelectedIndex(yearRange: number, year: number): number {
    const rangeMiddlePointYear = moment().year();
    return year - rangeMiddlePointYear + yearRange;
  }

  isYearsRangeBoundary(arrow: ArrowValue): boolean {
    const { year, yearsRange, month } = this.monthSection;
    if (arrow === this.arrow.FORWARD) {
      return year === moment().year() + yearsRange && month === 11;
    }
    if (arrow === this.arrow.BACK) {
      return year === moment().year() - yearsRange && month === 0;
    }
  }

  isPresentTime() {
    const [currentYear, currentMonth] = this.calendarService.getPresentMonth();
    return this.monthSection.year == currentYear && this.monthSection.month === currentMonth;
  }
}

interface PickerSelectValue {
  month: PickerSelectColumns;
  year: PickerSelectColumns;
}

interface PickerSelectColumns {
  columnIndex: number;
  text: any;
  value: number;
}
