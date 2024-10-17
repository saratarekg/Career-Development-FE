import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environment';
import { PaginatedUsers } from '../../models/userDto';
import {JourneyMapService} from "./journeyMap.service";

describe('JourneyMapService', () => {
  let service: JourneyMapService;
  let httpMock: HttpTestingController;

  const mockUsers: PaginatedUsers = {
    content: [
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', phone: '1234567890' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password', phone: '0987654321' }
    ],
    totalElements: 2,
    totalPages: 1,
    size: 2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JourneyMapService],
    });

    service = TestBed.inject(JourneyMapService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user progress with scores', () => {
    service.getUserProgress(0, 2).subscribe(usersWithScores => {
      expect(usersWithScores).toEqual([
        { firstName: 'John', lastName: 'Doe', score: 100 },
        { firstName: 'Jane', lastName: 'Smith', score: 90 },
      ]);
    });

    const reqUsers = httpMock.expectOne(`${environment.usersAPI}/allUsersPaginated?page=0&size=2`);
    expect(reqUsers.request.method).toBe('GET');
    reqUsers.flush(mockUsers);

    const reqScore1 = httpMock.expectOne(`${environment.usersScoresAPI}/1`);
    expect(reqScore1.request.method).toBe('GET');
    reqScore1.flush({ userId: '1', score: 100 });

    const reqScore2 = httpMock.expectOne(`${environment.usersScoresAPI}/2`);
    expect(reqScore2.request.method).toBe('GET');
    reqScore2.flush({ userId: '2', score: 90 });
  });

});
