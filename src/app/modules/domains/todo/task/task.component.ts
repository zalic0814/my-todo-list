import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  Observable,
  Subscription,
  debounceTime,
  delay,
  map,
  merge,
} from 'rxjs';

import { Task } from '../../../../shared/models/task.model';
import {
  TaskAgentService,
  UpdateTaskPayload,
} from '../../../../shared/services/task-agent.service';
import { TaskStatus } from '../../../../shared/enums/task-status.enum';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements AfterViewInit, OnDestroy {
  @Output() taskCancelled = new EventEmitter<void>();
  @Output() taskSaved = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();

  @Input()
  public get task(): Partial<Task> | undefined {
    return this._task;
  }
  public set task(value: Partial<Task> | undefined) {
    this._task = value;
    this.descriptionCtrl?.setValue(value?.description ?? '', {
      emitEvent: false,
    });
    this.locateAtCtrl?.setValue(value?.locateAt ?? null, { emitEvent: false });
  }
  private _task?: Partial<Task> | undefined;

  formGroup = new FormGroup({
    description: new FormControl(''),
    locateAt: new FormControl<Date | null>(null),
  });

  get descriptionCtrl() {
    return this.formGroup.get('description');
  }

  get locateAtCtrl() {
    return this.formGroup.get('locateAt');
  }

  get isDraft() {
    return this.task?.id == null;
  }

  showSaved$ = merge(
    this.taskUpdated.pipe(map(() => true)),
    this.taskUpdated.pipe(
      delay(1000),
      map(() => false),
    ),
  );

  private sub = new Subscription();

  constructor(public taskAgent: TaskAgentService) {}

  ngAfterViewInit(): void {
    this.sub.add(
      this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        this.updateTask(this.formGroup.value);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateTask(payload: UpdateTaskPayload) {
    if (!this.task?.id) return;
    this.taskAgent.updateTask(this.task.id, payload);
    this.taskUpdated.emit();
  }

  onSaveTask() {
    this.taskAgent.addTask({
      description: this.descriptionCtrl?.value ?? '',
      locateAt: this.locateAtCtrl?.value ?? null,
    });
    this.taskSaved.emit();
  }

  onCancelTask() {
    this.taskCancelled.emit();
  }

  onToggleStatus() {
    if (!this.task?.id) return;
    const status =
      this.task.status === TaskStatus.Completed
        ? TaskStatus.Uncompleted
        : TaskStatus.Completed;
    this.updateTask({ status });
  }

  onDeleteTask() {
    if (!this.task?.id) return;
    this.taskAgent.deleteTask(this.task.id);
  }
}
