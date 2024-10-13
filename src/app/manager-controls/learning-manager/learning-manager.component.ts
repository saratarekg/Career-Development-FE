import {Component, Input, OnInit} from '@angular/core';
import {UserLearningResponseDTO} from "../../models/learningDTO";
import {UserLearningsService} from "../../services/userLearnings/user-learnings.service";
import {ApprovalStatus} from "../../enums/approval-status.enum";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import { MatCardModule} from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-learning-manager',
  templateUrl: './learning-manager.component.html',
  standalone: true,
  imports: [
    NgForOf,
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatButton,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./learning-manager.component.css']
})
export class LearningManagerComponent implements OnInit{
  @Input() managedUsers: any[] = []; // Adjust type as necessary
  userLearnings: { [userId: string]: UserLearningResponseDTO[] } = {};

  comment: string = '';

  constructor(private userLearningsService: UserLearningsService) {}

  ngOnInit(): void {
    this.managedUsers.forEach(user => this.getSubmittedLearnings(user.id));
  }

  // Fetch submitted learnings by user
  getSubmittedLearnings(userId: string): void {
    this.userLearningsService.getUserLearningDetails(userId).subscribe(learnings => {
      this.userLearnings[userId] = learnings.filter(learning => learning.approvalStatus === ApprovalStatus.PENDING);
    });
  }

  updateApprovalStatus(id: string, newStatus: string): void {
    this.userLearningsService.updateApprovalStatus(id, newStatus).subscribe(() => {
      alert('Approval status updated successfully');
      this.managedUsers.forEach(user => this.getSubmittedLearnings(user.id));
    });
  }

  updateComment(id: string, comment: string): void {
    this.userLearningsService.updateComment(id, comment).subscribe(() => {
      alert('Comment updated successfully');
      this.comment = '';
      this.managedUsers.forEach(user => this.getSubmittedLearnings(user.id));
    });
  }

  protected readonly ApprovalStatus = ApprovalStatus;
}
