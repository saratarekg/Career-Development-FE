import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LearningSubjectsService } from './learning-subjects.service';
import { LearningSubjectsDTO } from '../../models/learningDTO';
import { environment } from '../../../environment';

describe('LearningSubjectsService', () => {
  let service: LearningSubjectsService;
  let httpMock: HttpTestingController;

  const mockLearningSubject: LearningSubjectsDTO = {
    id: '1',
    type: 'Type A',
    subject: 'Subject A',
  };

  const mockLearningSubjects: LearningSubjectsDTO[] = [mockLearningSubject];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LearningSubjectsService],
    });

    service = TestBed.inject(LearningSubjectsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all learning subjects', () => {
    service.getAllLearningSubjects().subscribe((subjects) => {
      expect(subjects).toEqual(mockLearningSubjects);
    });

    const req = httpMock.expectOne(`${environment.learningSubjectsAPI}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLearningSubjects);
  });

  it('should add a learning subject', () => {
    service.addLearningSubject(mockLearningSubject).subscribe((response) => {
      expect(response).toBe('Learning subject added successfully');
    });

    const req = httpMock.expectOne(`${environment.learningSubjectsAPI}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLearningSubject);
    req.flush('Learning subject added successfully');
  });

  it('should update a learning subject', () => {
    const subjectId = '1';
    service.updateLearningSubject(subjectId, mockLearningSubject).subscribe((response) => {
      expect(response).toBe('Learning subject updated successfully');
    });

    const req = httpMock.expectOne(`${environment.learningSubjectsAPI}/${subjectId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockLearningSubject);
    req.flush('Learning subject updated successfully');
  });

  it('should delete a learning subject', () => {
    const subjectId = '1';
    service.deleteLearningSubject(subjectId).subscribe((response) => {
      expect(response).toBe('Learning subject deleted successfully');
    });

    const req = httpMock.expectOne(`${environment.learningSubjectsAPI}/${subjectId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Learning subject deleted successfully');
  });
});
