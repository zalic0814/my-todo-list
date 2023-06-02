import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { AllTaskComponent } from './all-task/all-task.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [AllTaskComponent, CalendarComponent],
  imports: [CommonModule, TodoRoutingModule],
})
export class TodoModule {}
