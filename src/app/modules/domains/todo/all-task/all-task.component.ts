import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { combineLatestWith, map, startWith } from 'rxjs';

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
  filterCtrl = new FormControl('');
  sortCtrl = new FormControl<'asc' | 'desc'>('desc');

  allTasks$ = this.taskAgent.allTasks$.pipe(
    combineLatestWith(
      this.sortCtrl.valueChanges.pipe(startWith('desc')),
      this.filterCtrl.valueChanges.pipe(startWith('')),
    ),
    map(([tasks, sort, filter]) => {
      return tasks
        .filter((t) => {
          if (filter == null || filter.trim() === '') return true;
          return t.description
            ?.toLocaleLowerCase()
            ?.includes(filter.trim().toLocaleLowerCase());
        })
        .sort((a, b) => {
          const aLocateAt = a.locateAt ? a.locateAt.valueOf() : 0;
          const bLocateAt = b.locateAt ? b.locateAt.valueOf() : 0;
          if (sort === 'asc') return aLocateAt - bLocateAt;
          return bLocateAt - aLocateAt;
        });
    }),
  );
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
