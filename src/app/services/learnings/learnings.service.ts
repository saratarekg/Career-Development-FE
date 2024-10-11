// src/app/services/learning.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from "../../../environment";
import {Learning, LearningDTO, LearningSubjectsDTO, LearningTypesDTO} from "../../models/learningDTO";

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  private apiUrl = environment.learningsAPI;
  private learningTypesUrl = environment.learningTypesAPI;
  private learningSubjectsUrl = environment.learningSubjectsAPI;

  constructor(private http: HttpClient) {}

  getLearningTypeById(typeId: string): Observable<LearningTypesDTO> {
    return this.http.get<LearningTypesDTO>(`${this.learningTypesUrl}/${typeId}`);
  }

  getLearningSubjectById(subjectId: string): Observable<LearningSubjectsDTO> {
    return this.http.get<LearningSubjectsDTO>(`${this.learningSubjectsUrl}/${subjectId}`);
  }

  getLearningsWithDetails(): Observable<Learning[]> {
    return new Observable<Learning[]>(observer => {
      this.getAllLearnings().subscribe(learnings => {
        const learningDetails: Learning[] = [];

        console.log(learnings);
        const requests = learnings.map(learning => {
          return new Promise<void>((resolve, reject) => {
            const typeId = learning.learningTypeId; // Adjust based on your DTO structure
            const subjectId = learning.learningSubjectId; // Adjust based on your DTO structure

            // Fetch type and subject details in parallel
            Promise.all([
              this.getLearningTypeById(typeId).toPromise(),
              this.getLearningSubjectById(subjectId).toPromise()
            ])
              .then(([type, subject]) => {
                learningDetails.push({
                  title: learning.title,
                  description: learning.description,
                  lengthInHours: learning.lengthInHours,
                  type: subject?.type || 'Unknown Type',
                  subject: subject?.subject || 'Unknown Subject',
                  typeName: type?.typeName || 'Unknown Type',
                  baseScore: type?.baseScore || 0,
                  url: learning.url
                });
                resolve();
              })
              .catch(error => {
                console.error('Error fetching type or subject:', error);
                reject(error);
              });
          });
        });

        Promise.all(requests).then(() => {
          observer.next(learningDetails);
          observer.complete();
        })
          .catch(err => observer.error(err));
      });
    });
  }

  getAllLearnings(): Observable<LearningDTO[]> {
    return this.http.get<LearningDTO[]>(this.apiUrl).pipe(
      tap(learnings => {
        console.log(learnings); // Log the response here
      })
    );
  }

  // Add a new learning
  addLearning(newLearning: LearningDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, newLearning,{
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  // Update an existing learning
  updateLearning(id: string, updatedLearning: LearningDTO): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, updatedLearning,{
      withCredentials: true,
        responseType: 'text' as 'json'
    });
  }

  // Delete a learning
  deleteLearning(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`)
  }


}
