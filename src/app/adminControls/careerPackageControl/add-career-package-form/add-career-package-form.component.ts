import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { CareerPackageService } from '../../../services/careerPackage/career-package.service';
import { CareerPackage } from '../../../models/careerPackageDTO';
import {MatButton} from "@angular/material/button";

const allTitles: string[] = [
  'Associate_Software_Engineer',
  'Software_Engineer',
  'Staff_Software_Engineer',
  'Senior_Staff_Software_Engineer',
];

@Component({
  selector: 'app-add-career-package-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatButton,
  ],
  templateUrl: './add-career-package-form.component.html',
  styleUrl: './add-career-package-form.component.css',
})
export class AddCareerPackageFormComponent implements OnInit {
  addCareerPackageFormGroup!: FormGroup;

  constructor(private careerPackageService: CareerPackageService) {}

  availableCareerPackages!: CareerPackage[];
  nonAvailableCareerPackagesTitles: string[] = [];

  ngOnInit(): void {
    this.addCareerPackageFormGroup = new FormGroup({
      titleFormControl: new FormControl('', [Validators.required]),
      googleDocLinkFormControl: new FormControl('', [Validators.required]),
    });

    this.loadAvailableCareerPackages();
  }

  loadAvailableCareerPackages() {
    this.careerPackageService
      .getCareerPackages()
      .subscribe((careerPackagesPaginated) => {
        this.availableCareerPackages = careerPackagesPaginated.content;
        this.nonAvailableCareerPackagesTitles = allTitles.filter(
          (careerPackageTitle) =>
            !this.availableCareerPackages.some(
              (careerPackage) => careerPackage.title === careerPackageTitle
            )
        );
        this.careerPackageService.updateCareerPackages(
          this.availableCareerPackages
        );

        console.log(
          'Remaining CP to be added: ' + this.nonAvailableCareerPackagesTitles
        );
        console.log(
          'Available CP: ' + JSON.stringify(this.availableCareerPackages)
        );
      });
  }

  onSubmitAddCareerPackage() {
    console.log(this.addCareerPackageFormGroup.value);
    if (this.addCareerPackageFormGroup.valid) {
      this.careerPackageService.addCareerPackage({
        title: this.addCareerPackageFormGroup.get('titleFormControl')?.value,
        googleDocLink: this.addCareerPackageFormGroup.get(
          'googleDocLinkFormControl'
        )?.value,
      });
      alert("Career package added successfully.")
      this.addCareerPackageFormGroup.reset();
      this.loadAvailableCareerPackages();
    }
  }
}
