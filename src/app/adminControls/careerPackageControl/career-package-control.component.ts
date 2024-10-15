import { Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AddCareerPackageFormComponent } from './add-career-package-form/add-career-package-form.component';
import { EditCareerPackageFormComponent } from './edit-career-package-form/edit-career-package-form.component';

@Component({
  selector: 'app-admin-career-package-control',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    AddCareerPackageFormComponent,
    EditCareerPackageFormComponent,
  ],
  templateUrl: './career-package-control.component.html',
  styleUrl: './career-package-control.component.css',
})
export class CareerPackageControlComponent {
  accordion = viewChild.required(MatAccordion);
}
