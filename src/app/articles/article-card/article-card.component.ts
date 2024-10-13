import {Component, Input} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {ApprovalStatus} from "../../enums/approval-status.enum";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'article-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, DatePipe, NgClass, NgIf, MatIcon],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() title!: string;
  @Input() document!: string;
  @Input() date!: Date;






}
