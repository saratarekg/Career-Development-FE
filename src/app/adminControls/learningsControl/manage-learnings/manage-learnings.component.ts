import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {LearningDTO} from "../../../models/learningDTO";
import {LearningService} from "../../../services/learnings/learnings.service";
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {EditLearningComponent} from "../edit-learning/edit-learning.component";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-manage-learnings',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    NgForOf,
    MatChip,
    MatChipSet,
    MatIcon
  ],
  templateUrl: './manage-learnings.component.html',
  styleUrl: './manage-learnings.component.css'
})


export class ManageLearningsComponent implements OnInit {
  learnings: LearningDTO[] = [];

  constructor(private learningService: LearningService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLearnings();
  }

  loadLearnings(): void {
    this.learningService.getAllLearnings().subscribe({
      next: (data) => {
        console.log('  learnings:', data);

        this.learnings = data;
      },
      error: (error) => {
        console.error('Error fetching learnings:', error);
      },
    });
  }

  openEditDialog(learning: LearningDTO): void {
    const dialogRef = this.dialog.open(EditLearningComponent, {
      width: '400px',
      data: learning,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.learningService.updateLearning(learning.id, result).subscribe({
          next: (response) => {
            console.log(response);
            alert('Learning updated successfully');
            this.loadLearnings();
          },
          error: (error) => {
            alert('Error updating learning:'+ error);

          },
        });
      }
    });
  }

  deleteLearning(id: string): void {
    this.learningService.deleteLearning(id).subscribe({
      next: (response) => {
        console.log(response);
        alert('Learning deleted successfully');
        this.loadLearnings(); // Refresh the list after deleting
      },
      error: (error) => {
        alert('Error deleting learning:'+ error);
        console.error('Error deleting learning:', error)
      },
    });
  }
}
