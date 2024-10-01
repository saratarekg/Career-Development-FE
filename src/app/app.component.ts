import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";
import {JourneyMapComponent} from "./journey-map/journey-map.component";
import {HomeCardComponent} from "./home-card/home-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScoreboardComponent, JourneyMapComponent, HomeCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CareerDevelopmentApplicationFE';
}
