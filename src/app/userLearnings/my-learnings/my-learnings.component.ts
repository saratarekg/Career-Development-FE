import {Component, OnInit} from '@angular/core';
import {SubmitLearningFormComponent} from "../submit-learning-form/submit-learning-form.component";
import {Learning, UserLearningResponseDTO} from "../../models/learningDTO";
import {UserLearningsService} from "../../services/userLearnings/user-learnings.service";
import {LearningCardComponent} from "../../learningsLibrary/learning-card/learning-card.component";
import {NgForOf} from "@angular/common";
import {UserLearningCardComponent} from "../user-learning-card/user-learning-card.component";
import {AuthService} from "../../services/auth.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-my-learnings',
  standalone: true,
  imports: [
    SubmitLearningFormComponent,
    LearningCardComponent,
    NgForOf,
    UserLearningCardComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './my-learnings.component.html',
  styleUrl: './my-learnings.component.css'
})
export class MyLearningsComponent implements OnInit {


  userId: string | null = '';
  userLearningDetails: UserLearningResponseDTO[] = [];
  filteredLearnings: UserLearningResponseDTO[] = [];
  filter: string = ''; // Single filter input

  constructor(private userLearningService: UserLearningsService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe(userId => this.userId = userId);

    this.userId = this.authService.getUserId();

    console.log('User ID:', this.userId);
    this.loadUserLearningDetails();

  }

  applyFilters(): void {
    this.filteredLearnings = this.userLearningDetails.filter(learning => {
      const lowerCaseFilter = this.filter.toLowerCase();
      return (
        learning.title?.toLowerCase().includes(lowerCaseFilter) ||
        learning.approvalStatus?.toLowerCase().includes(lowerCaseFilter) ||
        learning.comment?.toLowerCase().includes(lowerCaseFilter)

      );
    });
  }


  loadUserLearningDetails(): void {
    this.userLearningService.getUserLearningDetails(this.userId!).subscribe(
      (data) => {
        this.userLearningDetails = data;
        this.filteredLearnings = data; // Initialize filteredLearnings
        console.log(data)
      },
      (error) => {
        console.error('Error fetching user learning details', error);
      }
    );
  }
}
