import {Component, viewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {AddLearningFormComponent} from "../add-learning-form/add-learning-form.component";
import {ManageLearningsComponent} from "../manage-learnings/manage-learnings.component";
import {ScoreboardLevelsComponent} from "../scoreboard-levels/scoreboard-levels.component";
import {LearningTypesComponent} from "../learning-types/learning-types.component";
import {LearningSubjectsComponent} from "../learning-subjects/learning-subjects.component";

@Component({
  selector: 'app-admin-learnings-control',
  standalone: true,
  imports: [MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, AddLearningFormComponent, ManageLearningsComponent, ScoreboardLevelsComponent, LearningTypesComponent, LearningSubjectsComponent,],
  templateUrl: './admin-learnings-control.component.html',
  styleUrl: './admin-learnings-control.component.css'
})
export class AdminLearningsControlComponent {
  accordion = viewChild.required(MatAccordion);


}
