import { TestBed } from '@angular/core/testing';

import { LearningTypesService } from './learning-types.service';

describe('LearningTypesService', () => {
  let service: LearningTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
