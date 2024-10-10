import {Component, OnInit} from '@angular/core';
import {
   LearningDTO,
  LearningSubjectsDTO,
  LearningTypesDTO,

} from "../../../models/learningDTO";
import {UserLearningsService} from "../../../services/userLearnings/user-learnings.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepickerModule,
} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {LearningService} from "../../../services/learnings/learnings.service";

@Component({
  selector: 'app-add-learning-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgForOf,
    MatSelect, MatOption,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButton, NgIf],
  templateUrl: './add-learning-form.component.html',
  styleUrl: './add-learning-form.component.css'
})
export class AddLearningFormComponent implements OnInit {

  userId: string | null = '';

  submitLearningDTO: LearningDTO = {
    id: '',
    title: '',
    learningTypeId: '',
    url: '',
    description: '',
    learningSubjectId: '',
    lengthInHours: 0
  };

  learningTypes: LearningTypesDTO[] = [];
  learningSubjects: LearningSubjectsDTO[] = [];


  constructor(private userLearningsService: UserLearningsService,
              private learningsService: LearningService
             ) {}

  ngOnInit(): void {
    this.loadLearningTypes();
    this.loadLearningSubjects();
  }


  loadLearningTypes(): void {
    this.userLearningsService.getLearningTypes().subscribe(types => {
      this.learningTypes = types;
    });
  }

  loadLearningSubjects(): void {
    this.userLearningsService.getLearningSubjects().subscribe(subjects => {
      this.learningSubjects = subjects;
    });
  }



  submit(): void {
    if  (
      this.submitLearningDTO.title &&
      this.submitLearningDTO.learningTypeId &&
      this.submitLearningDTO.url &&
      this.submitLearningDTO.description &&
      this.submitLearningDTO.lengthInHours &&
      this.submitLearningDTO.learningSubjectId
    ) {
      this.learningsService.addLearning(this.submitLearningDTO).subscribe(response => {
          alert('Learning added successfully');
          this.resetForm();
          window.location.reload();
        },
        error => {
          alert(`Error submitting learning form: ${error.message}`);
        });
    } else {
      console.warn('Form is not valid. Please check the errors and try again.');
    }
  }

  resetForm(): void {
    this.submitLearningDTO = {
      id: '',
      title: '',
      learningTypeId: '',
      url: '',
      description: '',
      learningSubjectId: '',
      lengthInHours: 0
    };
  }
}
