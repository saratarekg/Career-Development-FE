import {Component, OnInit} from '@angular/core';
import {SubmitLearningFormComponent} from "../submit-learning-form/submit-learning-form.component";
import {UserLearningResponseDTO} from "../../models/learningDTO";
import {UserLearningsService} from "../../services/userLearnings/user-learnings.service";
import {LearningCardComponent} from "../../learningsLibrary/learning-card/learning-card.component";
import {NgForOf} from "@angular/common";
import {UserLearningCardComponent} from "../user-learning-card/user-learning-card.component";


@Component({
  selector: 'app-my-learnings',
  standalone: true,
  imports: [
    SubmitLearningFormComponent,
    LearningCardComponent,
    NgForOf,
    UserLearningCardComponent
  ],
  templateUrl: './my-learnings.component.html',
  styleUrl: './my-learnings.component.css'
})
export class MyLearningsComponent implements OnInit {
  userId: string = '76fbd24c-7ab1-42d7-8b1e-d3ec0b5a4d5e';
  userLearningDetails: UserLearningResponseDTO[] = [];

  constructor(private userLearningService: UserLearningsService) {}

  ngOnInit(): void {
    this.loadUserLearningDetails();
  }

  loadUserLearningDetails(): void {
    this.userLearningService.getUserLearningDetails(this.userId).subscribe(
      (data) => {
        this.userLearningDetails = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching user learning details', error);
      }
    );
  }
}
