import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LearningTypesService } from './learning-types.service';
import { LearningTypesDTO } from '../../models/learningDTO';
import { environment } from '../../../environment';

describe('LearningTypesService', () => {
  let service: LearningTypesService;
  let httpMock: HttpTestingController;

  const mockLearningType: LearningTypesDTO = {
    id: '1',
    typeName: 'Type A',
    baseScore: 10,
  };

  const mockLearningTypes: LearningTypesDTO[] = [mockLearningType];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LearningTypesService],
    });

    service = TestBed.inject(LearningTypesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get all learning types', () => {
    service.getAllLearningTypes().subscribe((types) => {
      expect(types).toEqual(mockLearningTypes);
    });

    const req = httpMock.expectOne(`${environment.learningTypesAPI}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLearningTypes);
  });

  it('should add a learning type', () => {
    service.addLearningType(mockLearningType).subscribe((response) => {
      expect(response).toBe('Learning type added successfully');
    });

    const req = httpMock.expectOne(`${environment.learningTypesAPI}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLearningType);
    req.flush('Learning type added successfully');
  });

  it('should update a learning type', () => {
    const typeId = '1';
    service.updateLearningType(typeId, mockLearningType).subscribe((response) => {
      expect(response).toBe('Learning type updated successfully');
    });

    const req = httpMock.expectOne(`${environment.learningTypesAPI}/${typeId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockLearningType);
    req.flush('Learning type updated successfully');
  });

  it('should delete a learning type', () => {
    const typeId = '1';
    service.deleteLearningType(typeId).subscribe((response) => {
      expect(response).toBe('Learning type deleted successfully');
    });

    const req = httpMock.expectOne(`${environment.learningTypesAPI}/${typeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Learning type deleted successfully');
  });
});
