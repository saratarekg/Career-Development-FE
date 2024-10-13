import {Component, Input} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {ApprovalStatus} from "../../enums/approval-status.enum";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'user-article-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, DatePipe, NgClass, NgIf, MatIcon],
  templateUrl: './user-article-card.component.html',
  styleUrl: './user-article-card.component.css'
})
export class UserArticleCardComponent {
  @Input() title!: string;
  @Input() document!: string;
  @Input() date!: Date;
  @Input() approvalStatus!: ApprovalStatus;
  @Input() comment!: string;



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
