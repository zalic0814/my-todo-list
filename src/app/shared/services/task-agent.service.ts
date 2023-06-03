import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Task } from '../models/task.model';
import { TaskStatus } from '../enums/task-status.enum';

export type CreateTaskPayload = Pick<Task, 'description' | 'locateAt'>;
export type UpdateTaskPayload = Partial<
  Pick<Task, 'description' | 'locateAt' | 'status'>
>;

@Injectable({
  providedIn: 'root',
})
export class TaskAgentService {
  private _allTasks$ = new BehaviorSubject<Task[]>([]);
  allTasks$ = this._allTasks$.asObservable();

  constructor() {}

  addTask(payload: CreateTaskPayload): void {
    const newTask = this._createTask(payload);
    const allTasks = this._allTasks$.getValue();
    allTasks.unshift(newTask);
    this._allTasks$.next([...allTasks]);
  }

  updateTask(id: number, payload: UpdateTaskPayload): void {
    const allTasks = this._allTasks$.getValue();
    const index = allTasks.findIndex((t) => t.id === id);
    if (index < 0) return;
    const updatedTask = this._updateTask(allTasks[index], payload);
    allTasks[index] = updatedTask;
    this._allTasks$.next([...allTasks]);
  }

  deleteTask(id: number): void {
    const allTasks = this._allTasks$.getValue();
    const index = allTasks.findIndex((t) => t.id === id);
    allTasks.splice(index, 1);
    this._allTasks$.next([...allTasks]);
  }

  private _createTask(payload: CreateTaskPayload): Task {
    const now = Date.now();
    return {
      id: now,
      createdAt: now,
      updatedAt: now,
      status: TaskStatus.Uncompleted,
      locateAt: payload.locateAt,
      description: payload.description,
    };
  }

  private _updateTask(task: Task, payload: UpdateTaskPayload): Task {
    const now = Date.now();
    const newTask = { ...task, updatedAt: now };
    if (payload.status != null) newTask.status = payload.status;
    if (payload.locateAt !== undefined) newTask.locateAt = payload.locateAt;
    if (payload.description !== undefined)
      newTask.description = payload.description;
    return newTask;
  }
}
