import { Component, OnInit } from '@angular/core';
import {
  BoostersDTO,
  LearningDTO,
  LearningSubjectsDTO,
  LearningTypesDTO,
  ProofTypeDTO,
  SubmitUserLearningDTO,
} from '../../models/learningDTO';
import { ApprovalStatus } from '../../enums/approval-status.enum';
import { UserLearningsService } from '../../services/userLearnings/user-learnings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-submit-learning-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgForOf,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButton,
    NgIf,
  ],
  templateUrl: './submit-learning-form.component.html',
  styleUrl: './submit-learning-form.component.css',
})
export class SubmitLearningFormComponent implements OnInit {
  userId: string | null = '';

  submitUserLearningDTO: SubmitUserLearningDTO = {
    title: '',
    userId: this.userId!,
    proof: '',
    proofTypeId: '',
    activeBoosterId: '',
    learningId: '',
    learningTypeId: '',
    URL: '',
    description: '',
    learningSubjectId: '',
    lengthInHours: 0,
    date: new Date(),
    approvalStatus: ApprovalStatus.PENDING,
    comment: '',
  };

  learningOptions: LearningDTO[] = [];
  learningTypes: LearningTypesDTO[] = [];
  learningSubjects: LearningSubjectsDTO[] = [];
  proofTypes: ProofTypeDTO[] = [];

  constructor(
    private userLearningsService: UserLearningsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe((userId) => (this.userId = userId));

    this.userId = this.authService.getUserId();

    this.loadLearningOptions();
    this.loadLearningTypes();
    this.loadLearningSubjects();
    this.loadProofTypes();
  }

  loadLearningOptions(): void {
    this.userLearningsService.getLearningOptions().subscribe((options) => {
      this.learningOptions = options;
    });
  }

  loadLearningTypes(): void {
    this.userLearningsService.getLearningTypes().subscribe((types) => {
      this.learningTypes = types;
    });
  }

  loadLearningSubjects(): void {
    this.userLearningsService.getLearningSubjects().subscribe((subjects) => {
      this.learningSubjects = subjects;
    });
  }

  loadProofTypes(): void {
    this.userLearningsService.getProofTypes().subscribe((types) => {
      this.proofTypes = types;
    });
  }

  onLearningSelect(): void {
    if (this.submitUserLearningDTO.learningId) {
      this.submitUserLearningDTO.title = '';
      this.submitUserLearningDTO.learningTypeId = '';
      this.submitUserLearningDTO.URL = '';
      this.submitUserLearningDTO.description = '';
      this.submitUserLearningDTO.lengthInHours = 0;
      this.submitUserLearningDTO.learningSubjectId = '';
    }
  }

  submit(): void {
    this.submitUserLearningDTO.userId = this.userId!;

    if (
      this.submitUserLearningDTO.learningId ||
      (this.submitUserLearningDTO.title &&
        this.submitUserLearningDTO.learningTypeId &&
        this.submitUserLearningDTO.URL &&
        this.submitUserLearningDTO.description &&
        this.submitUserLearningDTO.lengthInHours &&
        this.submitUserLearningDTO.learningSubjectId)
    ) {
      this.userLearningsService
        .submitUserLearning(this.submitUserLearningDTO)
        .subscribe(
          (response) => {
            alert('Learning submitted successfully:');
            this.resetForm();
          },
          (error) => {
            alert(`Error submitting learning form: ${error.message}`);
          }
        );
    } else {
      console.warn('Form is not valid. Please check the errors and try again.');
    }
  }

  resetForm(): void {
    this.submitUserLearningDTO = {
      title: '',
      userId: this.userId!,
      proof: '',
      proofTypeId: '',
      activeBoosterId: '',
      learningId: '',
      learningTypeId: '',
      URL: '',
      description: '',
      learningSubjectId: '',
      lengthInHours: 0,
      date: new Date(),
      approvalStatus: ApprovalStatus.PENDING,
      comment: '',
    };
  }
}
