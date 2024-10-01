import { Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {JourneyMapComponent} from "../journey-map/journey-map.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css',
  imports: [MatCardModule, MatButtonModule, JourneyMapComponent, MatIcon],
})
export class HomeCardComponent {


}
