import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environment";
import {LearningSubjectsDTO} from "../../models/learningDTO";

@Injectable({
  providedIn: 'root'
})
export class LearningSubjectsService {
  private learningSubjectsUrl = environment.learningSubjectsAPI;

  constructor(private http: HttpClient) {
  }
  getAllLearningSubjects(): Observable<LearningSubjectsDTO[]> {
    return this.http.get<LearningSubjectsDTO[]>(`${this.learningSubjectsUrl}`, {
      withCredentials: true,
    });
  }

  addLearningSubject(learningSubject: LearningSubjectsDTO): Observable<string> {
    return this.http.post<string>(`${this.learningSubjectsUrl}`, learningSubject,{
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  updateLearningSubject(id: string, learningSubject: LearningSubjectsDTO): Observable<string> {
    return this.http.put<string>(`${this.learningSubjectsUrl}/${id}`, learningSubject,{
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  deleteLearningSubject(id: string): Observable<string> {
    return this.http.delete<string>(`${this.learningSubjectsUrl}/${id}`,{
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }
}
