import { TestBed } from '@angular/core/testing';

import { LearningSubjectsService } from './learning-subjects.service';

describe('LearningSubjectsService', () => {
  let service: LearningSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
