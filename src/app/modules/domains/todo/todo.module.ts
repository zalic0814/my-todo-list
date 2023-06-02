import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { AllTaskComponent } from './all-task/all-task.component';

@NgModule({
  declarations: [AllTaskComponent],
  imports: [CommonModule, TodoRoutingModule],
})
export class TodoModule {}
