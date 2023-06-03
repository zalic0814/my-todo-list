import { TestBed } from '@angular/core/testing';

import { TaskAgentService } from './task-agent.service';

describe('TaskAgentService', () => {
  let service: TaskAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
