import { Component, OnInit } from '@angular/core';
import { Learning } from '../../models/learningDTO';
import { LearningService } from "../../services/learnings/learnings.service";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { LearningCardComponent } from "../learning-card/learning-card.component";
import { NgForOf } from "@angular/common"; // Adjust the path as needed

@Component({
  selector: 'app-learning',
  templateUrl: './learnings.component.html',
  standalone: true,
  imports: [
    LearningCardComponent,
    MatFormFieldModule, MatInputModule, FormsModule, NgForOf
  ],
  styleUrls: ['./learnings.component.css'] // Adjust the path as needed
})
export class LearningsComponent implements OnInit {
  learnings: Learning[] = [];
  filteredLearnings: Learning[] = [];
  filter: string = ''; // Single filter input

  constructor(private learningService: LearningService) {}

  ngOnInit(): void {
    this.learningService.getLearningsWithDetails().subscribe(data => {
      this.learnings = data;
      this.filteredLearnings = data; // Initialize filteredLearnings
    });
  }

  applyFilters(): void {
    this.filteredLearnings = this.learnings.filter(learning => {
      const lowerCaseFilter = this.filter.toLowerCase();
      return (
        learning.title?.toLowerCase().includes(lowerCaseFilter) ||
        learning.subject?.toLowerCase().includes(lowerCaseFilter) ||
        learning.type?.toLowerCase().includes(lowerCaseFilter) ||
        learning.typeName?.toLowerCase().includes(lowerCaseFilter)

      );
    });
  }
}
