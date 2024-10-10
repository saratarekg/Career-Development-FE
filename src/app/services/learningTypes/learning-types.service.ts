import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LearningTypesDTO} from "../../models/learningDTO";
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class LearningTypesService {
  private learningTypesUrl = environment.learningTypesAPI;

  constructor(private http: HttpClient) { }

  // Get all learning types
  getAllLearningTypes(): Observable<LearningTypesDTO[]> {
    return this.http.get<LearningTypesDTO[]>(`${this.learningTypesUrl}`, {
      withCredentials: true,
    });
  }

  // Add a new learning type
  addLearningType(learningType: LearningTypesDTO): Observable<string> {
    return this.http.post<string>(`${this.learningTypesUrl}`, learningType, {
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  // Update an existing learning type
  updateLearningType(id: string, learningType: LearningTypesDTO): Observable<string> {
    return this.http.put<string>(`${this.learningTypesUrl}/${id}`, learningType, {
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  // Delete a learning type
  deleteLearningType(id: string): Observable<string> {
    return this.http.delete<string>(`${this.learningTypesUrl}/${id}`, {
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }
}
