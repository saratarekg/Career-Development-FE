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

@Component({
  selector: 'app-your-employees-career-package',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
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
}
