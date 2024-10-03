import { Component } from '@angular/core';
import {HomeCardComponent} from "../home-card/home-card.component";
import {ScoreboardComponent} from "../scoreboard/scoreboard.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        HomeCardComponent,
        ScoreboardComponent
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
