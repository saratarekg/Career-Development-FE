import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {UserLearningsService} from "../services/userLearnings/user-learnings.service";
import {UsersDTO} from "../models/userDto";
import {UserLearningResponseDTO} from "../models/learningDTO";
import {ApprovalStatus} from "../enums/approval-status.enum";
import {AuthService} from "../services/auth.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-manager-controls',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    MatCardModule,
    MatFormFieldModule,
    MatButton,
    MatInput
  ],
  templateUrl: './manager-controls.component.html',
  styleUrl: './manager-controls.component.css'
})
export class ManagerControlsComponent implements OnInit{
  managerId: string = 'your-manager-id';
  managedUsers: UsersDTO[] = [];
  userLearnings: { [userId: string]: UserLearningResponseDTO[] } = {};
  selectedLearning: UserLearningResponseDTO = {
    id:'',
    title: '',
    URL: '',
    proof: '',
    proofTypeName: '',
    date: new Date(),
    approvalStatus: ApprovalStatus.PENDING,
    comment: '',
    lengthInHours: 0,
    baseScore: 0
  }
  comment: string = '';


  constructor(private userService: UserService,
              private userLearningsService: UserLearningsService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe(userId => this.managerId = userId!);

    this.managerId = this.authService.getUserId()!;
    this.getManagedUsers();
  }

  // Fetch managed users
  getManagedUsers(): void {
    this.userService.getManagedUsers(this.managerId).subscribe(users => {
      this.managedUsers = users;
      this.managedUsers.forEach(user => this.getSubmittedLearnings(user.id));
    });
  }

  // Fetch submitted learnings by user
  getSubmittedLearnings(userId: string): void {
    this.userLearningsService.getUserLearningDetails(userId).subscribe(learnings => {
      this.userLearnings[userId] = learnings.filter(learning => learning.approvalStatus === ApprovalStatus.PENDING);
    });
  }

  // Approve or reject the learning
  updateApprovalStatus(id: string, newStatus: string): void {
    this.userLearningsService.updateApprovalStatus(id, newStatus).subscribe(() => {
      alert('Approval status updated successfully');
      this.getManagedUsers(); // Refresh data
    });
  }

  // Update comment for a learning
  updateComment(id: string, comment: string): void {
    this.userLearningsService.updateComment(id, comment).subscribe(() => {
      alert('Comment updated successfully');
      this.comment='';
      this.getManagedUsers(); // Refresh data
    });
  }

  protected readonly ApprovalStatus = ApprovalStatus;
}
