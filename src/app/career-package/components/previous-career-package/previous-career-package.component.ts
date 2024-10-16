import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import {
  PaginatedSubmittedCP,
  SubmittedCP,
} from '../../../models/careerPackageDTO';
import { CommonModule } from '@angular/common';
import {CareerPackageService} from "../../../services/careerPackage/career-package.service";

@Component({
  selector: 'app-previous-career-package',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './previous-career-package.component.html',
  styleUrl: './previous-career-package.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviousCareerPackageComponent implements OnInit {
  constructor(
    private careerPackageService: CareerPackageService,
    private authService: AuthService
  ) {}

  careerPackages!: SubmittedCP[];

  ngOnInit(): void {
    console.log('PreviousCareerPackageComponent');
    const userId = this.authService.getUserId();
    if (userId) {
      this.careerPackageService.getAllUserSubmittedCP(userId).subscribe((data) => {
        this.careerPackages = data.content;
      });
    } else {
      console.error('User ID is null');
    }
  }

  trackBySubmissionId(index: number, careerPackage: any): string {
    return careerPackage.submissionId;
  }

  getApprovalStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'approved';
      case 'PENDING':
        return 'pending';
      case 'REJECTED':
        return 'rejected';
      default:
        return '';
    }
  }

}
