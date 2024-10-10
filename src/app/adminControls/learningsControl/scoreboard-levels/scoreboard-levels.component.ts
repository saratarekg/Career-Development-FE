import { Component, OnInit } from '@angular/core';
import { ScoreboardLevelsDTO } from "../../../models/scoreboardDTO";
import { ScoreboardService } from "../../../services/scoreboard/scoreboard.service";
import { FormsModule } from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-scoreboard-levels',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatFormFieldModule,
    MatListModule,
    MatButton,
    MatInput
  ],
  templateUrl: './scoreboard-levels.component.html',
  styleUrls: ['./scoreboard-levels.component.css']
})
export class ScoreboardLevelsComponent implements OnInit {
  scoreboardLevels: ScoreboardLevelsDTO[] = [];
  newScoreboardLevel: ScoreboardLevelsDTO = { id: '', levelName: '', minScore: 0 };
  selectedScoreboardLevel: ScoreboardLevelsDTO = { id: '', levelName: '', minScore: 0 }; // For editing
  isEditing: boolean = false; // Flag to track edit mode

  constructor(private scoreboardLevelsService: ScoreboardService) {}

  ngOnInit(): void {
    this.loadScoreboardLevels();
  }

  loadScoreboardLevels(): void {
    this.scoreboardLevelsService.getAllScoreboardLevels(0, 10).subscribe(response => {
      const scoreboardLevels = response.content; // Access the scoreboard levels
      this.scoreboardLevels = scoreboardLevels;
      console.log(scoreboardLevels);
    }, error => {
      console.error('Error fetching scoreboard levels:', error);
    });
  }

  addScoreboardLevel(): void {
    this.scoreboardLevelsService.addScoreboardLevel(this.newScoreboardLevel).subscribe(
      (response) => {
        alert('Scoreboard Level added successfully');
        this.loadScoreboardLevels(); // Reload the scoreboard levels
        this.newScoreboardLevel = { id: '', levelName: '', minScore: 0 }; // Reset the form
      },
      (error) => {
        console.error('Error adding scoreboard level:', error);
        alert('Failed to add scoreboard level. Please try again.' + error);
      }
    );
  }

  editScoreboardLevel(level: ScoreboardLevelsDTO): void {
    this.selectedScoreboardLevel = { ...level }; // Copy the selected level for editing
    this.isEditing = true; // Set edit mode to true
  }

  updateScoreboardLevel(id: string): void {
    this.scoreboardLevelsService.updateScoreboardLevel(id, this.selectedScoreboardLevel).subscribe(
      (response) => {
        alert('Scoreboard Level updated successfully');
        this.loadScoreboardLevels(); // Reload the scoreboard levels
        this.cancelEdit(); // Reset edit mode
      },
      (error) => {
        console.error('Error updating scoreboard level:', error);
        alert('Failed to update scoreboard level. Please try again.' + error);
      }
    );
  }

  cancelEdit(): void {
    this.isEditing = false; // Reset edit mode
    this.selectedScoreboardLevel = { id: '', levelName: '', minScore: 0 }; // Reset selected level
  }

  deleteScoreboardLevel(id: string): void {
    this.scoreboardLevelsService.deleteScoreboardLevel(id).subscribe(
      (response) => {
        alert('Scoreboard Level deleted successfully');
        this.loadScoreboardLevels(); // Reload the scoreboard levels
      },
      (error) => {
        console.error('Error deleting scoreboard level:', error);
        alert('Failed to delete scoreboard level. Please try again.' + error);
      }
    );
  }
}
