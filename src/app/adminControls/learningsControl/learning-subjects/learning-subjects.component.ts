import { Component, OnInit } from '@angular/core';
import {LearningSubjectsDTO} from "../../../models/learningDTO";
import {LearningSubjectsService} from "../../../services/learningSubjects/learning-subjects.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-learning-subjects',
  templateUrl: './learning-subjects.component.html',
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
  styleUrls: ['./learning-subjects.component.css']
})
export class LearningSubjectsComponent implements OnInit {
  learningSubjects: LearningSubjectsDTO[] = [];
  selectedLearningSubject: LearningSubjectsDTO = { id: '', type: '', subject: '' };
  isEditing = false;
  newLearningSubject: LearningSubjectsDTO = { id: '', type: '', subject: '' };

  constructor(private learningSubjectsService: LearningSubjectsService) {}

  ngOnInit(): void {
    this.loadLearningSubjects();
  }

  loadLearningSubjects(): void {
    this.learningSubjectsService.getAllLearningSubjects().subscribe(
      (data: LearningSubjectsDTO[]) => {
        this.learningSubjects = data;
      },
      (error) => {
        console.error('Error fetching learning subjects', error);
      }
    );
  }

  addLearningSubject(): void {
    this.learningSubjectsService.addLearningSubject(this.newLearningSubject).subscribe(
      () => {
        alert('Learning subject added successfully');
        this.loadLearningSubjects();
        this.newLearningSubject = { id: '', type: '', subject: '' };
      },
      (error) => {
        alert('Error adding learning subject'+ error);
        console.error('Error adding learning subject', error);
      }
    );
  }

  editLearningSubject(subject: LearningSubjectsDTO): void {
    this.selectedLearningSubject = { ...subject };
    this.isEditing = true;
  }

  updateLearningSubject(id: string): void {
    if (this.selectedLearningSubject) {
      this.learningSubjectsService.updateLearningSubject(id, this.selectedLearningSubject).subscribe(
        () => {
          alert('Learning subject updated successfully');
          this.loadLearningSubjects();
          this.cancelEdit();
        },
        (error) => {
          alert('Error updating learning subject'+ error)
          console.error('Error updating learning subject', error);
        }
      );
    }
  }

  deleteLearningSubject(id: string): void {
    this.learningSubjectsService.deleteLearningSubject(id).subscribe(
      () => {
        alert('Learning subject deleted successfully');
        this.loadLearningSubjects();
      },
      (error) => {
        alert('Error deleting learning subject'+ error)
        console.error('Error deleting learning subject', error);
      }
    );
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedLearningSubject = { id: '', type: '', subject: '' };;
  }
}
