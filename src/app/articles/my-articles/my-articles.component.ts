import {Component, OnInit} from '@angular/core';
import {LearningCardComponent} from "../../learningsLibrary/learning-card/learning-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {UserArticleCardComponent} from "../user-article-card/user-article-card.component";
import {AuthService} from "../../services/auth.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArticleDTO} from "../../models/articleDTO";
import {ArticleService} from "../../services/articlesService/articles-service.service";


@Component({
  selector: 'app-my-articles',
  standalone: true,
  imports: [
    LearningCardComponent,
    NgForOf,
    UserArticleCardComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './my-articles.component.html',
  styleUrl: './my-articles.component.css'
})
export class MyArticlesComponent implements OnInit {


  userId: string | null = '';
  userArticles: ArticleDTO[] = [];
  filteredArticles: ArticleDTO[] = [];
  filter: string = ''; // Single filter input

  constructor(private articleService: ArticleService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe(userId => this.userId = userId);

    this.userId = this.authService.getUserId();

    console.log('User ID:', this.userId);
    this.loadUserArticles();

  }

  applyFilters(): void {
    this.filteredArticles = this.userArticles.filter(learning => {
      const lowerCaseFilter = this.filter.toLowerCase();
      return (
        learning.title?.toLowerCase().includes(lowerCaseFilter) ||
        learning.approvalStatus?.toLowerCase().includes(lowerCaseFilter) ||
        learning.comment?.toLowerCase().includes(lowerCaseFilter)

      );
    });
  }


  loadUserArticles(): void {
    this.articleService.getArticlesByUser(this.userId!).subscribe(
      (data) => {
        this.userArticles = data;
        this.filteredArticles = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching user articles', error);
      }
    );
  }
}
