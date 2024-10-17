import { Component, OnInit } from '@angular/core';
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
  selector: 'app-edit-career-package-form',
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
  templateUrl: './edit-career-package-form.component.html',
  styleUrl: './edit-career-package-form.component.css',
})
export class EditCareerPackageFormComponent implements OnInit{
  editCareerPackageFormGroup!: FormGroup;

  constructor(private careerPackageService: CareerPackageService) {}

  availableCareerPackages!: CareerPackage[];
  availableCareerPackagesTitles: string[] = [];

  ngOnInit(): void {
    this.editCareerPackageFormGroup = new FormGroup({
      titleFormControl: new FormControl('', [Validators.required]),
      googleDocLinkFormControl: new FormControl('', [Validators.required]),
    });

    // I am checking all the avaliable Career Packages that were added before
    this.careerPackageService.careerPackages$.subscribe((titles) => {
      this.availableCareerPackages = titles;
      this.availableCareerPackagesTitles = allTitles.filter(
        (careerPackageTitle) =>
          this.availableCareerPackages.some(
            (careerPackage) => careerPackage.title === careerPackageTitle
          )
      );
    });
  }

  // If the form is valid, then fetch the Career Package based on the title selected and then send it to career-package.service.ts
  onSubmitEditCareerPackage() {
    if (this.editCareerPackageFormGroup.valid) {
      const selectedCareerPackage = this.availableCareerPackages.find(
        (careerPackage) =>
          careerPackage.title ===
          this.editCareerPackageFormGroup.value.titleFormControl
      );
      if (selectedCareerPackage) {
        const updatedCareerPackage = {
          id: selectedCareerPackage.id,
          title: this.editCareerPackageFormGroup.value.titleFormControl,
          googleDocLink:
            this.editCareerPackageFormGroup.value.googleDocLinkFormControl,
        };
        this.careerPackageService.editCareerPackage(updatedCareerPackage);
        alert("Career package edited successfully.")
        this.editCareerPackageFormGroup.reset();
      }
    }
  }
}
