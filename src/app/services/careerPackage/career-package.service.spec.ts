import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CareerPackageService} from "./career-package.service";
import {
  PaginatedCareerPackages,
  PaginatedSubmittedCP,
  RequestSubmitCPDto,
  SubmittedCP
} from "../../models/careerPackageDTO";


describe('CareerPackageService', () => {
  let service: CareerPackageService;
  let httpMock: HttpTestingController;

  const mockPaginatedCareerPackages: PaginatedCareerPackages = {
    size: 1,
    content: [],
    totalPages: 1,
    totalElements: 10
  };

  const mockSubmittedCP: SubmittedCP = {
    submissionId: "id",
    careerPackageId:"cPId",
    userId:"uId",
    managerId:"mId",
    title:"title",
    googleDocLink:"url",
    status:"status",
  }

  const mockRequestSubmitCPDto: RequestSubmitCPDto = {
    userId:"uId",
    title:"title",
    googleDocLink:"url",
  }

  const mockPaginatedSubmittedCP: PaginatedSubmittedCP= {
    content: [mockSubmittedCP],
    totalElements: 10,
    totalPages: 1,
    size: 1,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CareerPackageService,
      ],
    });

    service = TestBed.inject(CareerPackageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all career packages', () => {
    service.getAllCareerPackages().subscribe(response => {
      expect(response).toEqual(mockPaginatedCareerPackages);
    });

    const req = httpMock.expectOne('http://localhost:8083/api/careerPackages/getAllCareerPackagesPaginated');
    expect(req.request.method).toBe('GET');
    req.flush(mockPaginatedCareerPackages);
  });

  it('should get all submitted career packages for a user', () => {
    const userId = 'mockUserId';
    service.getAllUserSubmittedCP(userId).subscribe(response => {
      expect(response).toEqual(mockPaginatedSubmittedCP);
    });

    const req = httpMock.expectOne(`http://localhost:8083/api/submittedCP/getCareerPackagePaginatedByUser/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPaginatedSubmittedCP);
  });

  it('should post a submitted career package', () => {

    service.postSubmittedCP(mockRequestSubmitCPDto);

    const req = httpMock.expectOne('http://localhost:8083/api/submittedCP/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequestSubmitCPDto);
    req.flush(mockRequestSubmitCPDto); // Mock response as necessary
  });

  it('should post a new career package', () => {
    const requestCareerPackage = {
      title: 'New Package',
      googleDocLink: 'http://example.com',
    };

    service.postAddCareerPackage(requestCareerPackage);

    const req = httpMock.expectOne('http://localhost:8083/api/careerPackages/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestCareerPackage);
    req.flush(requestCareerPackage);
  });

  it('should update a career package', () => {
    const careerPackage = {
      id: '1',
      title: 'Updated Package',
      googleDocLink: 'http://example.com/updated',
    };

    service.putEditCareerPackage(careerPackage);

    const req = httpMock.expectOne(`http://localhost:8083/api/careerPackages/update/${careerPackage.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      title: careerPackage.title,
      googleDocLink: careerPackage.googleDocLink,
    });
    req.flush(careerPackage);
  });

  it('should update the status of a submitted career package', () => {
    service.updateStatusSubmittedCP(mockSubmittedCP);

    const req = httpMock.expectOne(`${service['urlSubmittedCP']}/update`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockSubmittedCP);
    req.flush(mockSubmittedCP);
  });
});
