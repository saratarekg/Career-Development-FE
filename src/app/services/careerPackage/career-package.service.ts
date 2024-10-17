import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {
  CareerPackage,
  PaginatedCareerPackages, PaginatedSubmittedCP,
  RequestCareerPackage,
  RequestSubmitCPDto,
  SubmittedCP,
} from '../../models/careerPackageDTO';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CareerPackageService implements OnInit {
  constructor( private httpClient: HttpClient) {}

  private urlCareerPackages = 'http://localhost:8083/api/careerPackages';
  private urlSubmittedCP = 'http://localhost:8083/api/submittedCP';

  private careerPackagesSubject = new BehaviorSubject<CareerPackage[]>([]);
  careerPackages$ = this.careerPackagesSubject.asObservable();

  updateCareerPackages(newCareerPackages: CareerPackage[]) {
    this.careerPackagesSubject.next(newCareerPackages); // Notify subscribers with the new titles
  }

  ngOnInit(): void {
    this.getAllCareerPackages().subscribe((data) => {
      console.log(data);
    });
  }

  getCareerPackages(): Observable<PaginatedCareerPackages> {
    return this.getAllCareerPackages();
  }

  submitCareerPackage(requestSubmitCPDto: RequestSubmitCPDto) {
    this.postSubmittedCP(requestSubmitCPDto);
  }

  getAllUsersSubmittedCP(userId: string) {
    return this.getAllUserSubmittedCP(userId);
  }

  addCareerPackage(requestCareerPackage: RequestCareerPackage) {
    this.postAddCareerPackage(requestCareerPackage);
  }

  editCareerPackage(careerPackage: CareerPackage) {
    this.putEditCareerPackage(careerPackage);
  }

  updateStatusSubmittedCareerPackage(submittedCP: SubmittedCP) {
    console.log(submittedCP);
    this.updateStatusSubmittedCP(submittedCP);
  }

  getAllCareerPackages(): Observable<PaginatedCareerPackages> {
    return this.httpClient
      .get<PaginatedCareerPackages>(
        `${this.urlCareerPackages}/getAllCareerPackagesPaginated`,
        { withCredentials: true }
      )
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  getAllUserSubmittedCP(userId: string): Observable<PaginatedSubmittedCP> {
    return this.httpClient.get<PaginatedSubmittedCP>(
      `${this.urlSubmittedCP}/getCareerPackagePaginatedByUser/${userId}`,
      { withCredentials: true }
    );
  }

  postSubmittedCP(requestSubmitCPDto: RequestSubmitCPDto) {
    console.log(requestSubmitCPDto);
    this.httpClient
      .post<RequestSubmitCPDto>(
        `${this.urlSubmittedCP}/add`,
        requestSubmitCPDto,
        { withCredentials: true }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  postAddCareerPackage(requestCareerPackage: RequestCareerPackage) {
    this.httpClient
      .post<RequestCareerPackage>(
        `${this.urlCareerPackages}/add`,
        requestCareerPackage,
        { withCredentials: true }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  putEditCareerPackage(careerPackage: CareerPackage) {
    const requestCareerPackage: RequestCareerPackage = {
      title: careerPackage.title,
      googleDocLink: careerPackage.googleDocLink,
    };

    this.httpClient
      .patch<RequestCareerPackage>(
        `${this.urlCareerPackages}/update/${careerPackage.id}`,
        requestCareerPackage,
        { withCredentials: true }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  updateStatusSubmittedCP(submittedCP: SubmittedCP) {
    console.log(submittedCP);
    this.httpClient
      .put<SubmittedCP>(`${this.urlSubmittedCP}/update`, submittedCP, {
        withCredentials: true,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
