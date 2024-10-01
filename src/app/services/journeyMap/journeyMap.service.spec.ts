import { TestBed } from '@angular/core/testing';

import { JourneyMapService } from './journeyMap.service';

describe('ScoreboardService', () => {
  let service: JourneyMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JourneyMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
