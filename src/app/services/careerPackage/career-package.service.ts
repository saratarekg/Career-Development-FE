import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CareerPackage,
  PaginatedCareerPackages,
  RequestCareerPackage,
  RequestSubmitCPDto,
} from '../../models/careerPackageDTO';

@Injectable({
  providedIn: 'root',
})
export class CareerPackageService implements OnInit {
  constructor(private httpService: HttpService) {}

  private careerPackagesSubject = new BehaviorSubject<CareerPackage[]>([]);
  careerPackages$ = this.careerPackagesSubject.asObservable();

  updateCareerPackages(newCareerPackages: CareerPackage[]) {
    this.careerPackagesSubject.next(newCareerPackages); // Notify subscribers with the new titles
  }

  ngOnInit(): void {
    this.httpService.getAllCareerPackages().subscribe((data) => {
      console.log(data);
    });
  }

  getCareerPackages(): Observable<PaginatedCareerPackages> {
    return this.httpService.getAllCareerPackages();
  }

  submitCareerPackage(requestSubmitCPDto: RequestSubmitCPDto) {
    this.httpService.postSubmittedCP(requestSubmitCPDto);
  }

  getAllUsersSubmittedCP(userId: string) {
    return this.httpService.getAllUserSubmittedCP(userId);
  }

  addCareerPackage(requestCareerPackage: RequestCareerPackage) {
    this.httpService.postAddCareerPackage(requestCareerPackage);
  }

  editCareerPackage(careerPackage: CareerPackage) {
    this.httpService.putEditCareerPackage(careerPackage);
  }
}
