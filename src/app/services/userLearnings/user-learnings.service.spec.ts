import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserLearningsService } from './user-learnings.service';
import { environment } from '../../../environment';
import { SubmitUserLearningDTO, UserLearningResponseDTO } from '../../models/learningDTO';
import {ApprovalStatus} from "../../enums/approval-status.enum";

describe('UserLearningsService', () => {
  let service: UserLearningsService;
  let httpMock: HttpTestingController;

  const mockUserLearningResponse: UserLearningResponseDTO[] = [
    {
      id: '1',
      title: 'Angular Basics',
      URL: 'http://example.com/angular-basics',
      proof: 'http://example.com/proof1',
      proofTypeName: 'Certificate',
      date: new Date('2024-10-01'),
      approvalStatus: ApprovalStatus.APPROVED, // Adjust according to your enum values
      comment: 'Great learning!',
      lengthInHours: 5,
      baseScore: 10,
    }
  ];

  const mockSubmitLearningDTO: SubmitUserLearningDTO = {
    userId: '123',
    learningId: '456',
    proof: 'http://example.com/proof2',
    proofTypeId: 'proofTypeId',
    title: 'Advanced Angular',
    activeBoosterId: 'boosterId', // Optional
    learningTypeId: 'learningTypeId', // Optional
    URL: 'http://example.com/advanced-angular',
    description: 'Deep dive into Angular',
    learningSubjectId: 'subjectId',
    lengthInHours: 3,
    date: new Date('2024-10-10'),
    approvalStatus: ApprovalStatus.PENDING, // Adjust according to your enum values
    comment: 'Looking forward to approval!',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserLearningsService],
    });

    service = TestBed.inject(UserLearningsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit user learning', () => {
    service.submitUserLearning(mockSubmitLearningDTO).subscribe((response) => {
      expect(response).toBe('Learning submitted successfully');
    });

    const req = httpMock.expectOne(`${environment.userLearningsAPI}/submit`);
    expect(req.request.method).toBe('POST');
    req.flush('Learning submitted successfully');
  });


  it('should get learning types', () => {
    service.getLearningTypes().subscribe((types) => {
      expect(types).toEqual([{ id: '1', typeName: 'Online', baseScore: 10 }]);
    });

    const req = httpMock.expectOne(`${environment.learningTypesAPI}`);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', typeName: 'Online', baseScore: 10 }]);
  });

  it('should get learning subjects', () => {
    service.getLearningSubjects().subscribe((subjects) => {
      expect(subjects).toEqual([{ id: '1', type: 'Core', subject: 'Mathematics' }]);
    });

    const req = httpMock.expectOne(`${environment.learningSubjectsAPI}`);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', type: 'Core', subject: 'Mathematics' }]);
  });

  it('should get proof types', () => {
    service.getProofTypes().subscribe((proofs) => {
      expect(proofs).toEqual([{ id: '1', name: 'Certificate' }]);
    });

    const req = httpMock.expectOne(`${environment.proofAPI}`);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', name: 'Certificate' }]);
  });

  it('should get active boosters', () => {
    service.getActiveBoosters().subscribe((boosters) => {
      expect(boosters).toEqual([{ id: '1', name: 'Speed Booster', type: 'Type1', value: 5, isActive: true }]);
    });

    const req = httpMock.expectOne(`${environment.boostersAPI}`);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', name: 'Speed Booster', type: 'Type1', value: 5, isActive: true }]);
  });

  it('should get user learning details', () => {
    const userId = '123';
    service.getUserLearningDetails(userId).subscribe((details) => {
      expect(details).toEqual(mockUserLearningResponse);
    });

    const req = httpMock.expectOne(`${environment.userLearningsAPI}/submittedLearnings/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserLearningResponse);
  });

  it('should update approval status', () => {
    const id = '1';
    const newStatus = ApprovalStatus.APPROVED; // Adjust according to your enum values
    service.updateApprovalStatus(id, newStatus).subscribe((response) => {
      expect(response).toBe('Approval status updated successfully');
    });

    const req = httpMock.expectOne(`${environment.userLearningsAPI}/updateApprovalStatus/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush('Approval status updated successfully');
  });

  it('should update comment', () => {
    const id = '1';
    const comment = 'Updated comment';
    service.updateComment(id, comment).subscribe((response) => {
      expect(response).toBe('Comment updated successfully');
    });

    const req = httpMock.expectOne(`${environment.userLearningsAPI}/updateComment/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush('Comment updated successfully');
  });
});
