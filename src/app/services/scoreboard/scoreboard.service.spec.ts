import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environment';
import {PaginatedScoreboardLevelsDTO, ScoreboardLevelsDTO} from '../../models/scoreboardDTO';
import {ScoreboardService} from "./scoreboard.service";

describe('ScoreboardService', () => {
  let service: ScoreboardService;
  let httpMock: HttpTestingController;


    const mockScoreboardLevel: ScoreboardLevelsDTO = {
    id: '1',
    levelName: 'Explorer',
    minScore: 0,
  };

  const mockScoreboardLevels: ScoreboardLevelsDTO[] = [mockScoreboardLevel]

  const mockPaginatedScoreboardLevels: PaginatedScoreboardLevelsDTO = {
    content: mockScoreboardLevels,
    totalElements: 10,
    totalPages: 1,
    size: 10,
    number: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScoreboardService],
    });

    service = TestBed.inject(ScoreboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a scoreboard level', () => {
    service.addScoreboardLevel(mockScoreboardLevel).subscribe((response) => {
      expect(response).toBe('Scoreboard level added successfully');
    });

    const req = httpMock.expectOne(environment.scoreboardLevelsAPI);
    expect(req.request.method).toBe('POST');
    req.flush('Scoreboard level added successfully');
  });

  it('should update a scoreboard level', () => {
    const id = '1';
    service.updateScoreboardLevel(id, mockScoreboardLevel).subscribe((response) => {
      expect(response).toBe('Scoreboard level updated successfully');
    });

    const req = httpMock.expectOne(`${environment.scoreboardLevelsAPI}/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush('Scoreboard level updated successfully');
  });

  it('should delete a scoreboard level', () => {
    const id = '1';
    service.deleteScoreboardLevel(id).subscribe((response) => {
      expect(response).toBe('Scoreboard level deleted successfully');
    });

    const req = httpMock.expectOne(`${environment.scoreboardLevelsAPI}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Scoreboard level deleted successfully');
  });

  it('should get all scoreboard levels', () => {
    service.getAllScoreboardLevels(1, 10).subscribe((response) => {
      expect(response).toEqual(mockPaginatedScoreboardLevels);
    });

    const req = httpMock.expectOne(`${environment.scoreboardLevelsAPI}/all?page=1&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPaginatedScoreboardLevels);
  });

  it('should calculate user score', () => {
    const userId = '123';
    service.calculateUserScore(userId);

    const req = httpMock.expectOne(`${environment.usersScoresAPI}/calculate/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush('User score calculation successful');
  });
});
