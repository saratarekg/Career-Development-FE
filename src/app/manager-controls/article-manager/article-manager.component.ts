import {Component, Input, OnInit} from '@angular/core';
import {ArticleDTO} from "../../models/articleDTO";
import {ArticleService} from "../../services/articlesService/articles-service.service";
import {ApprovalStatus} from "../../enums/approval-status.enum";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
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
  styleUrls: ['./article-manager.component.css']
})
export class ArticleManagerComponent implements OnInit{
  @Input() managedUsers: any[] = [];
  userArticles: { [userId: string]: ArticleDTO[] } = {};

  comment: string = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.managedUsers.forEach(user => this.getSubmittedArticles(user.id));
  }

  getSubmittedArticles(userId: string): void {
    this.articleService.getArticlesByUser(userId).subscribe(article => {
      this.userArticles[userId] = article.filter(article => article.approvalStatus === ApprovalStatus.PENDING);
    });
  }

  updateApprovalStatusArticle(id: string, newStatus: string): void {
    this.articleService.updateApprovalStatus(id, newStatus).subscribe(() => {
      alert('Approval status updated successfully');
      this.managedUsers.forEach(user => this.getSubmittedArticles(user.id));
    });
  }

  updateCommentArticle(id: string, comment: string): void {
    this.articleService.updateComment(id, comment).subscribe(() => {
      alert('Comment updated successfully');
      this.comment = '';
      this.managedUsers.forEach(user => this.getSubmittedArticles(user.id));
    });
  }

  protected readonly ApprovalStatus = ApprovalStatus;
}
