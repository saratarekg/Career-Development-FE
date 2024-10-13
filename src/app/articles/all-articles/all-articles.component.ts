import {Component, OnInit} from '@angular/core';
import {LearningCardComponent} from "../../learningsLibrary/learning-card/learning-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {UserArticleCardComponent} from "../user-article-card/user-article-card.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArticleDTO} from "../../models/articleDTO";
import {ArticleService} from "../../services/articlesService/articles-service.service";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {ApprovalStatus} from "../../enums/approval-status.enum";


@Component({
  selector: 'app-all-articles',
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
    NgIf,
    ArticleCardComponent
  ],
  templateUrl: './my-articles.component.html',
  styleUrl: './my-articles.component.css'
})
export class AllArticlesComponent implements OnInit {


  allArticles: ArticleDTO[] = [];
  filteredArticles: ArticleDTO[] = [];
  filter: string = ''; // Single filter input

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadAllArticles();

  }

  applyFilters(): void {
    this.filteredArticles = this.allArticles.filter(learning => {
      const lowerCaseFilter = this.filter.toLowerCase();
      return (
        learning.title?.toLowerCase().includes(lowerCaseFilter) ||
        learning.approvalStatus?.toLowerCase().includes(lowerCaseFilter) ||
        learning.comment?.toLowerCase().includes(lowerCaseFilter)
      );
    });
  }


  loadAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (data) => {
        this.allArticles = data;
        this.filteredArticles = data;
        this.filteredArticles = this.filteredArticles.filter(article => article.approvalStatus === ApprovalStatus.APPROVED);

        console.log(data)
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }
}
