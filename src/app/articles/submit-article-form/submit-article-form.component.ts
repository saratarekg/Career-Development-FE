import { Component, OnInit } from '@angular/core';
import { ArticleDTO } from "../../models/articleDTO";
import { ApprovalStatus } from "../../enums/approval-status.enum";
import { ArticleService } from "../../services/articlesService/articles-service.service";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-submit-article-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './submit-article-form.component.html',
  styleUrls: ['./submit-article-form.component.css']  // Fix the typo here
})
export class SubmitArticleFormComponent implements OnInit {
  userId: string | null = '';
  article: ArticleDTO = {
    id: '',
    title: '',
    author: this.userId!,  // Initialize with an empty string
    submissionDate: new Date(),
    approvalStatus: ApprovalStatus.PENDING,
    comment: '',
    document: '',
  };

  constructor(private articleService: ArticleService,
              private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to userId observable
    this.authService.userId$.subscribe(userId => this.userId = userId);

    this.userId = this.authService.getUserId();
  }

  submitArticle(): void {
    // Set the author before submitting
    this.article.author = this.userId!;

    this.articleService.submitArticle(this.article).subscribe({
      next: (response) => {
        alert('Article submitted successfully.');
        console.log('Article submitted successfully', this.article);
        this.resetForm();
      },
      error: (error) => {
        alert('Error submitting article: ' + error);
        console.error('Error submitting article', error);
      },
    });
  }

  resetForm(): void {
    this.article = {
      id: '',
      title: '',
      author: this.userId!,  // Ensure the userId is set again here
      submissionDate: new Date(),
      approvalStatus: ApprovalStatus.PENDING,
      comment: '',
      document: '',
    };
  }
}
