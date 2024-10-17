import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CareerPackageService } from '../services/careerPackage/career-package.service';
import {
  CareerPackage,
  PaginatedCareerPackages,
  TitlePackage,
} from '../models/careerPackageDTO';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { PreviousCareerPackageComponent } from './components/previous-career-package/previous-career-package.component';
import { AuthService } from '../services/auth.service';
import { YourEmployeesCareerPackageComponent } from './components/your-employees-career-package/your-employees-career-package.component';

const titlePackage: TitlePackage = {
  Associate_Software_Engineer: [
    'Associate Software Engineer',
    'Software Engineer Package',
  ],
  Software_Engineer: ['Software Engineer', 'Staff Software Engineer Package'],
  Staff_Software_Engineer: [
    'Staff Software Engineer',
    'Sr. Staff Software Engineer Package',
  ],
  Senior_Staff_Software_Engineer: [
    'Sr. Staff Software Engineer',
    'Principal Software Engineer Package',
  ],
};
@Component({
  selector: 'app-career-package',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatExpansionModule,
    PreviousCareerPackageComponent,
    YourEmployeesCareerPackageComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './career-package.component.html',
  styleUrl: './career-package.component.css',
})
export class CareerPackageComponent implements OnInit {
  constructor(
    private careerPackageService: CareerPackageService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  careerPackagesPaginated!: PaginatedCareerPackages;
  careerPackages!: string[];
  dataSource!: string[];
  titlePackageMap = titlePackage;

  selected = 'Software_Engineer';
  value = '';
  displayedColumns: string[] = ['title', 'package'];
  careerPackageSubmissionForm!: FormGroup;
  readonly submitCpPanelOpenState = signal(false);
  readonly viewCpPanelOpenState = signal(false);
  isManager!: boolean;

  ngOnInit(): void {
    this.careerPackageService.getCareerPackages().subscribe((data) => {
      // Update the component with the fetched data
      this.careerPackagesPaginated = data;
      this.careerPackages = [];

      this.careerPackages = Object.keys(titlePackage).filter((title) =>
        this.careerPackagesPaginated.content.some(
          (careerPackage) => careerPackage.title === title
        )
      );
      this.dataSource = this.careerPackages;
    });

    this.authService.isManager$.subscribe((isManager) => {
      this.isManager = isManager;
      console.log('Is the user a manager?', isManager);
    });

    this.careerPackageSubmissionForm = new FormGroup({
      packageTitleControlForm: new FormControl('', Validators.required),
      googleDocLinkControlForm: new FormControl('', Validators.required),
    });
  }



  onSubmitCareerPackage() {
    const userid = this.authService.getUserId();
    this.careerPackageSubmissionForm.value.packageTitleControlForm =
      this.selected;
    if (userid) {
      this.careerPackageService.submitCareerPackage({
        title: this.careerPackageSubmissionForm.value.packageTitleControlForm,
        userId: userid,
        googleDocLink:
          this.careerPackageSubmissionForm.value.googleDocLinkControlForm,
      })
    }
    alert("Career package submitted successfully.")
    this.careerPackageSubmissionForm.reset();
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
