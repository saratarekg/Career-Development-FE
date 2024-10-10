import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,} from '@angular/material/dialog';
import {LearningDTO} from "../../../models/learningDTO";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
@Component({
  selector: 'app-edit-learning',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatButton
  ],
  templateUrl: './edit-learning.component.html',
  styleUrl: './edit-learning.component.css'
})


export class EditLearningComponent {
  constructor(
    public dialogRef: MatDialogRef<EditLearningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LearningDTO
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
