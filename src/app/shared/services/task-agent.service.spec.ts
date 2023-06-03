import { TestBed } from '@angular/core/testing';

import { TaskAgentService } from './task-agent.service';
import { Task } from '../models/task.model';
import { TaskStatus } from '../enums/task-status.enum';

describe('TaskAgentService', () => {
  let service: TaskAgentService;
  let tasksSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAgentService);
  });

  beforeEach(() => {
    tasksSpy = jasmine.createSpy('tasksSpy');
    service.allTasks$.subscribe(tasksSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty list of tasks while first time subscription', () => {
    expect(tasksSpy).toHaveBeenCalledWith([]);
  });

  it('should return a list with a task after adding task', () => {
    const now = new Date();
    service.addTask({ locateAt: now, description: 'test' });
    expect(tasksSpy).toHaveBeenCalledWith([
      {
        locateAt: now,
        description: 'test',
        id: now.valueOf(),
        createdAt: now.valueOf(),
        updatedAt: now.valueOf(),
        status: TaskStatus.Uncompleted,
      },
    ] as Task[]);
  });

  it('should return a updated list after updating task', () => {
    const now = new Date();
    service.addTask({ locateAt: now, description: 'test' });
    tasksSpy.calls.reset();

    const now2 = new Date();
    now2.setDate(now.getDate() + 1);
    service.updateTask(now2.valueOf(), {
      locateAt: now2,
      description: 'test2',
      status: TaskStatus.Completed,
    });
    expect(tasksSpy).toHaveBeenCalledTimes(0);

    service.updateTask(now.valueOf(), {
      locateAt: now2,
      description: 'test2',
      status: TaskStatus.Completed,
    });
    expect(tasksSpy).toHaveBeenCalledWith([
      jasmine.objectContaining({
        locateAt: now2,
        description: 'test2',
        id: now.valueOf(),
        createdAt: now.valueOf(),
        status: TaskStatus.Completed,
      }),
    ]);
  });

  it('should return less tasks after deleting task', () => {
    const now = new Date();
    service.addTask({ locateAt: now, description: 'test' });
    tasksSpy.calls.reset();

    service.deleteTask(now.valueOf());
    expect(tasksSpy).toHaveBeenCalledWith([]);
  });
});
