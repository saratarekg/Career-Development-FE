import {Component, Input} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-learning-card',
  standalone: true,
    imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatIcon],
  templateUrl: './learning-card.component.html',
  styleUrl: './learning-card.component.css'
})
export class LearningCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() type!: string;
  @Input() subject!: string;
  @Input() typeName!: string;
  @Input() baseScore!: number;
  @Input() url!: string;
  @Input() hours!: number;

}
