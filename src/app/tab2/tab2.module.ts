import { WorkoutsComponent } from './../shared/workout-day/workouts/workouts.component';
import { TimelineComponent } from './../shared/workout-day/timeline/timeline.component';
import { WorkoutDayHeaderComponent } from './../shared/workout-day/workout-day-header/workout-day-header.component';
import { WorkoutDayComponent } from './../shared/workout-day/workout-day.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { WorkoutComponent } from '../shared/workout-day/workout/workout.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule, Tab2PageRoutingModule],
  declarations: [Tab2Page, WorkoutDayComponent, WorkoutDayHeaderComponent, TimelineComponent, WorkoutComponent],
})
export class Tab2PageModule {}
