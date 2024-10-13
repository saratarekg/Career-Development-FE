import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environment";
import {ArticleDTO} from "../../models/articleDTO";

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = environment.articleAPI

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<ArticleDTO[]> {
    return this.http.get<ArticleDTO[]>(`${this.apiUrl}`,
      {
        withCredentials: true
      });
  }

  getArticlesByUser(userId: string): Observable<ArticleDTO[]> {
    return this.http.get<ArticleDTO[]>(`${this.apiUrl}/submittedArticlesByUser/${userId}`,
      {
    withCredentials: true
      });
  }

  updateApprovalStatus(id: string, newStatus: string): Observable<string> {
    const params = { newStatus: newStatus };
    return this.http.put<string>(`${this.apiUrl}/updateApprovalStatus/${id}`, {}, {withCredentials: true,
      responseType: 'text' as 'json', params });
  }

  updateComment(id: string, comment: string): Observable<string> {
    const params = { comment: comment };
    return this.http.put<string>(`${this.apiUrl}/updateComment/${id}`, {}, { withCredentials: true,
      responseType: 'text' as 'json', params });
  }

  submitArticle(article: ArticleDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/submitArticle`, article,{
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }
}
