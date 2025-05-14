import { TestBed } from '@angular/core/testing';

import { TaskListApiService } from './task-list-api.service';

describe('TaskListApiService', () => {
  let service: TaskListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
