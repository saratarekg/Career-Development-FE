import {Component, Input} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {ApprovalStatus} from "../../enums/approval-status.enum";
import {DatePipe, NgClass} from "@angular/common";

@Component({
  selector: 'user-learning-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, DatePipe, NgClass],
  templateUrl: './user-learning-card.component.html',
  styleUrl: './user-learning-card.component.css'
})
export class UserLearningCardComponent {
  @Input() title!: string;
  @Input() url!: string;
  @Input() proof!: string;
  @Input() proofTypeName!: string;
  @Input() date!: Date;
  @Input() approvalStatus!: ApprovalStatus;
  @Input() comment!: string;
  @Input() hours!: number;
  @Input() baseScore!: number;


  getApprovalStatusClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'approved';
      case 'Pending':
        return 'pending';
      case 'Rejected':
        return 'rejected';
      default:
        return '';
    }
  }

}
