import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllTaskComponent } from './all-task/all-task.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: AllTaskComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
