import { ChangeDetectionStrategy, Component } from '@angular/core';

import { tap } from 'rxjs';

import {
  CreateTaskPayload,
  TaskAgentService,
} from '../../../../shared/services/task-agent.service';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllTaskComponent {
  allTasks$ = this.taskAgent.allTasks$;
  draftTask?: CreateTaskPayload;

  constructor(private taskAgent: TaskAgentService) {}

  onAddDraftTask() {
    this.draftTask = { description: '', locateAt: new Date() };
  }

  onClearDraft() {
    this.draftTask = undefined;
  }

  taskTrackBy(index: number, task: Task) {
    return task.id;
  }
}
