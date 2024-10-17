import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleDTO } from '../../models/articleDTO';
import { environment } from '../../../environment';
import {ArticleService} from "./articles-service.service";
import {ApprovalStatus} from "../../enums/approval-status.enum";

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;


  const mockArticles: ArticleDTO[] = [
    {
      id: '1',
      title: 'Test Article 1',
      author: 'Author One',
      submissionDate: new Date('2023-10-01'),
      approvalStatus: ApprovalStatus.PENDING,
      comment: 'Initial comment for Test Article 1',
      document: 'link/to/document1.pdf'
    },
    {
      id: '2',
      title: 'Test Article 2',
      author: 'Author Two',
      submissionDate: new Date('2023-10-02'),
      approvalStatus: ApprovalStatus.APPROVED,
      comment: 'Initial comment for Test Article 2',
      document: 'link/to/document2.pdf'
    },
  ];

  const newArticle: ArticleDTO = {
    id: '3',
    title: 'New Article',
    author: 'Author Three',
    submissionDate: new Date('2023-10-03'),
    approvalStatus: ApprovalStatus.PENDING,
    comment: 'New article submission comment',
    document: 'link/to/newDocument.pdf'
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService],
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all articles', () => {
    service.getAllArticles().subscribe((articles) => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(mockArticles);
    });

    const req = httpMock.expectOne(`${environment.articleAPI}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles); // Simulate a successful response
  });

  it('should retrieve articles by user', () => {
    const userId = '123';
    service.getArticlesByUser(userId).subscribe((articles) => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(mockArticles);
    });

    const req = httpMock.expectOne(`${environment.articleAPI}/submittedArticlesByUser/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles); // Simulate a successful response
  });

  it('should update approval status', () => {
    const articleId = '1';
    const newStatus = 'approved';

    service.updateApprovalStatus(articleId, newStatus).subscribe((response) => {
      expect(response).toBe('Approval status updated');
    });

    const expectedUrl = `${environment.articleAPI}/updateApprovalStatus/${articleId}?newStatus=${encodeURIComponent(newStatus)}`;
    const req = httpMock.expectOne(expectedUrl);
  expect(req.request.method).toBe('PUT');
    req.flush('Approval status updated');
  });

  it('should update comment', () => {
    const articleId = '1';
    const comment = 'Updated comment';

    service.updateComment(articleId, comment).subscribe((response) => {
      expect(response).toBe('Comment updated');
    });

    const expectedUrl = `${environment.articleAPI}/updateComment/${articleId}?comment=${encodeURIComponent(comment)}`;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toBe('PUT');
    req.flush('Comment updated');
  });


  it('should submit an article', () => {

    service.submitArticle(newArticle).subscribe((response) => {
      expect(response).toBe('Article submitted');
    });

    const req = httpMock.expectOne(`${environment.articleAPI}/submitArticle`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newArticle);
    req.flush('Article submitted'); // Simulate a successful response
  });
});
