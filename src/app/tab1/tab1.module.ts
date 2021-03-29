import { WeekDaysComponent } from './../shared/calendar/calendar-week-days/calendar-week-days.component';
import { CalendarHeaderComponent } from '../shared/calendar/calendar-header/calendar-header.component';
import { DayComponent } from '../shared/calendar/calendar-day/calendar-day.component';
import { CalendarComponent } from './../shared/calendar/calendar.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule, Tab1PageRoutingModule],
  declarations: [Tab1Page, CalendarComponent, DayComponent, CalendarHeaderComponent, WeekDaysComponent],
})
export class Tab1PageModule {}
