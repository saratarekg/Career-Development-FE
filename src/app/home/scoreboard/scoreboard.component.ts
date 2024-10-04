import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserScoreboardDTO } from '../../models/userDto';
import { ScoreboardService } from '../../services/scoreboard/scoreboard.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'; // Import for data source
import { MatSort, MatSortModule } from '@angular/material/sort'; // Import for sorting
import { NgClass, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [
    MatTableModule,
    NgClass,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIcon,
    NgIf,
  ],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
})
export class ScoreboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rank', 'name', 'score', 'level'];
  userScoreboard: UserScoreboardDTO[] = [];
  dataSource = new MatTableDataSource<UserScoreboardDTO>(this.userScoreboard);
  page = 0;
  size = 10;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private scoreboardService: ScoreboardService) {}

  ngOnInit(): void {
    this.loadScoreboard();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.dataSource.sort.sort({
      id: 'score',
      start: 'desc',
      disableClear: true,
    });
  }

  loadScoreboard(): void {
    this.scoreboardService.getScoreboard(this.page, this.size).subscribe(
      (data) => {
        this.userScoreboard = data;
        this.dataSource.data = this.userScoreboard;
      },
      (error) => {
        console.error('Error fetching scoreboard', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
