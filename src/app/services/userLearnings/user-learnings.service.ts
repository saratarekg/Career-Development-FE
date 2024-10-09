import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environment";
import {
  BoostersDTO,
  Learning,
  LearningDTO,
  LearningSubjectsDTO,
  LearningTypesDTO, ProofTypeDTO,
  SubmitUserLearningDTO, UserLearningResponseDTO
} from "../../models/learningDTO";


@Injectable({
  providedIn: 'root',
})
export class UserLearningsService {
  private userLearningsAPI = environment.userLearningsAPI;
  private learningsAPI = environment.learningsAPI;
  private learningTypesUrl = environment.learningTypesAPI;
  private learningSubjectsUrl = environment.learningSubjectsAPI;
  private boostersUrl = environment.boostersAPI;
  private proofUrl = environment.proofAPI;

  constructor(private http: HttpClient) {}

  submitUserLearning(dto: SubmitUserLearningDTO): Observable<string> {
    return this.http.post<string>(`${this.userLearningsAPI}/submit`, dto, {
      withCredentials: true,
      responseType: 'text' as 'json'

    });
  }

  getLearningOptions(): Observable<LearningDTO[]> {
    return this.http.get<LearningDTO[]>(`${this.learningsAPI}`);
  }

  getLearningTypes(): Observable<LearningTypesDTO[]> {
    return this.http.get<LearningTypesDTO[]>(`${this.learningTypesUrl}`);
  }

  getLearningSubjects(): Observable<LearningSubjectsDTO[]> {
    return this.http.get<LearningSubjectsDTO[]>(`${this.learningSubjectsUrl}`);
  }

  getProofTypes(): Observable<ProofTypeDTO[]> {
    return this.http.get<ProofTypeDTO[]>(`${this.proofUrl}`);
  }

  getActiveBoosters(): Observable<BoostersDTO[]> {
    return this.http.get<BoostersDTO[]>(`${this.boostersUrl}`);
  }


  getUserLearningDetails(userId: string): Observable<UserLearningResponseDTO[]> {
    return this.http.get<UserLearningResponseDTO[]>(`${this.userLearningsAPI}/submittedLearnings/${userId}`);
  }
}
