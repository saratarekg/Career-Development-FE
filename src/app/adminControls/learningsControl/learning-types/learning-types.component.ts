import { Component, OnInit } from '@angular/core';
import {LearningTypesDTO} from "../../../models/learningDTO";
import {LearningTypesService} from "../../../services/learningTypes/learning-types.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-learning-types',
  templateUrl: './learning-types.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatFormFieldModule,
    MatListModule,
    MatButton,
    MatInput
  ],
  styleUrls: ['./learning-types.component.css']
})
export class LearningTypesComponent implements OnInit {
  learningTypes: LearningTypesDTO[] = [];
  selectedLearningType: LearningTypesDTO = { id: '', typeName: '', baseScore: 0 };
  isEditing = false;
  newLearningType: LearningTypesDTO = { id: '', typeName: '', baseScore: 0 };

  constructor(private learningTypesService: LearningTypesService) {}

  ngOnInit(): void {
    this.loadLearningTypes();
  }

  loadLearningTypes(): void {
    this.learningTypesService.getAllLearningTypes().subscribe(
      (data: LearningTypesDTO[]) => {
        this.learningTypes = data;
      },
      (error) => {
        console.error('Error fetching learning types', error);
      }
    );
  }

  addLearningType(): void {
    this.learningTypesService.addLearningType(this.newLearningType).subscribe(
      () => {
        alert('Learning type added successfully');
        this.loadLearningTypes();
        this.newLearningType = { id: '', typeName: '', baseScore: 0 };
      },
      (error) => {
        alert('Error adding learning type'+ error);

        console.error('Error adding learning type', error);
      }
    );
  }

  editLearningType(type: LearningTypesDTO): void {
    this.selectedLearningType = { ...type };
    this.isEditing = true;
  }

  updateLearningType(id: string): void {
    if (this.selectedLearningType) {
      this.learningTypesService.updateLearningType(id, this.selectedLearningType).subscribe(
        () => {
          alert('Learning type updated successfully');
          this.loadLearningTypes();
          this.cancelEdit();
        },
        (error) => {
          alert('Error updating learning type'+ error)

          console.error('Error updating learning type', error);
        }
      );
    }
  }

  deleteLearningType(id: string): void {
    this.learningTypesService.deleteLearningType(id).subscribe(
      () => {
        alert('Learning type deleted successfully');
        this.loadLearningTypes();
      },
      (error) => {
        alert('Error deleting learning type'+ error)
        console.error('Error deleting learning type', error);
      }
    );
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedLearningType ={ id: '', typeName: '', baseScore: 0 };
  }
}
