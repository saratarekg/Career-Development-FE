import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { UsersDTO } from '../../../models/userDto';
import { AuthService } from '../../../services/auth.service';
import { CareerPackageService } from '../../../services/careerPackage/career-package.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CareerPackage, SubmittedCP } from '../../../models/careerPackageDTO';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-your-employees-career-package',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatChipsModule],
  templateUrl: './your-employees-career-package.component.html',
  styleUrl: './your-employees-career-package.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YourEmployeesCareerPackageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private careerPackageService: CareerPackageService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  managerId!: string;
  managedUsers: UsersDTO[] = [];

  usersSubmittedCP: { [userId: string]: SubmittedCP[] } = {};

  ngOnInit(): void {
    this.managerId = this.authService.getUserId()!;

    if (this.managerId) {
      console.log('HERE');
      this.userService.getManagedUsers(this.managerId).subscribe((users) => {
        this.managedUsers = users;
        this.managedUsers.forEach((user) => {
          this.careerPackageService
            .getAllUsersSubmittedCP(user.id)
            .subscribe((response) => {
              this.usersSubmittedCP[user.id] = response.content; // Assuming response.content is an array of CareerPackage

              console.log('Users submitted CP:', this.usersSubmittedCP);
              console.log('Managed users:', this.managedUsers);

              console.log(
                `Career packages for user ${user.id}:`,
                this.usersSubmittedCP[user.id]
              );

              this.cdr.markForCheck();
            });
        });
      });
    }
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

  acceptCareerPackage(submittedCP: SubmittedCP) {
    console.log('AcceptingCareerPackage');
    console.log(submittedCP);
    this.careerPackageService.updateStatusSubmittedCareerPackage({
      ...submittedCP,
      status: 'APPROVED',
    });
  }

  rejectCareerPackage(submittedCP: SubmittedCP) {
    console.log('RejectingCareerPackage');
    this.careerPackageService.updateStatusSubmittedCareerPackage({
      ...submittedCP,
      status: 'REJECTED',
    });
  }
}
