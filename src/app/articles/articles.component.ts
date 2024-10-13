import { Component } from '@angular/core';
import {AllArticlesComponent} from "./all-articles/all-articles.component";
import {MyArticlesComponent} from "./my-articles/my-articles.component";
import {SubmitArticleFormComponent} from "./submit-article-form/submit-article-form.component";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    AllArticlesComponent,
    MyArticlesComponent,
    SubmitArticleFormComponent
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

}
