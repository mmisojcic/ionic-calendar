import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICalendarDay } from '../shared/calendar/calendar.models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private router: Router) {}
  onSelectDay(day: ICalendarDay) {
    console.log('day', day);
    this.router.navigate(['tabs/tab2']);
  }
}
