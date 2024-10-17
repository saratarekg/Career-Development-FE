import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environment';
import {  LearningDTO, LearningTypesDTO, LearningSubjectsDTO } from '../../models/learningDTO';
import {LearningService} from "./learnings.service";
import {of} from "rxjs";

describe('LearningService', () => {
  let service: LearningService;
  let httpMock: HttpTestingController;

  const mockLearningType: LearningTypesDTO = {
    id: '1',
    typeName: 'Video',
    baseScore: 10,
  };

  const mockLearningSubject: LearningSubjectsDTO = {
    id: '1',
    subject: 'Mathematics',
    type: 'Science',
  };

  const mockLearningDTO: LearningDTO = {
    id: '1',
    title: 'Algebra Basics',
    description: 'An introductory course on algebra.',
    lengthInHours: 3,
    learningTypeId: '1',
    learningSubjectId: '1',
    url: 'http://example.com/algebra-basics',
  };

  const mockLearnings: LearningDTO[] = [mockLearningDTO];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LearningService],
    });

    service = TestBed.inject(LearningService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all learnings', () => {
    service.getAllLearnings().subscribe((learnings) => {
      expect(learnings).toEqual(mockLearnings);
    });

    const req = httpMock.expectOne(environment.learningsAPI);
    expect(req.request.method).toBe('GET');
    req.flush(mockLearnings);
  });

  it('should get learning type by ID', () => {
    const typeId = '1';
    service.getLearningTypeById(typeId).subscribe((type) => {
      expect(type).toEqual(mockLearningType);
    });

    const req = httpMock.expectOne(`${environment.learningTypesAPI}/${typeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLearningType);
  });

  it('should get learning subject by ID', () => {
    spyOn(service, 'getLearningSubjectById').and.returnValue(of(mockLearningSubject));

    const subjectId = '1';
    service.getLearningSubjectById(subjectId).subscribe((subject) => {
      expect(subject).toEqual(mockLearningSubject);

    });

    expect(service.getLearningSubjectById).toHaveBeenCalledWith(subjectId);
  });

  it('should get learnings with details', (done) => {
    spyOn(service, 'getAllLearnings').and.returnValue(of(mockLearnings));

    service.getLearningsWithDetails().subscribe((learningDetails) => {
      expect(learningDetails.length).toBe(1);
      expect(learningDetails[0].title).toBe('Algebra Basics');
      done();
    });

    const reqTypes = httpMock.expectOne(`${environment.learningTypesAPI}/1`);
    expect(reqTypes.request.method).toBe('GET');
    reqTypes.flush(mockLearningType);

    const reqSubjects = httpMock.expectOne(`${environment.learningSubjectsAPI}/1`);
    expect(reqSubjects.request.method).toBe('GET');
    reqSubjects.flush(mockLearningSubject);
  });

  it('should add new learning', () => {
    service.addLearning(mockLearningDTO).subscribe((response) => {
      expect(response).toBe('Learning added successfully');
    });

    const req = httpMock.expectOne(`${environment.learningsAPI}/add`);
    expect(req.request.method).toBe('POST');
    req.flush('Learning added successfully');
  });

  it('should update existing learning', () => {
    const id = '1';
    service.updateLearning(id, mockLearningDTO).subscribe((response) => {
      expect(response).toBe('Learning updated successfully');
    });

    const req = httpMock.expectOne(`${environment.learningsAPI}/update/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush('Learning updated successfully');
  });

  it('should delete a learning', () => {
    const id = '1';
    service.deleteLearning(id).subscribe((response) => {
      expect(response).toBe('Learning deleted successfully');
    });

    const req = httpMock.expectOne(`${environment.learningsAPI}/delete/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Learning deleted successfully');
  });
});
