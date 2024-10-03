import { Component, OnInit } from '@angular/core';
import { JourneyMapService } from '../services/journeyMap/journeyMap.service';
import { UserJourneyDTO } from '../models/userDto';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-journey-map',
  standalone: true,
  templateUrl: './journey-map.component.html',
  imports: [NgForOf, NgStyle, NgIf, MatTooltip, MatIcon],
  styleUrls: ['./journey-map.component.css'],
})
export class JourneyMapComponent implements OnInit {
  users: UserJourneyDTO[] = [];

  constructor(private journeyMapService: JourneyMapService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const page = 0;
    const size = 10;
    this.journeyMapService
      .getUserProgress(page, size)
      .subscribe((data: UserJourneyDTO[]) => {
        this.users = data;
      });
  }

  calculateTransform(score: number): { tx: number; ty: number } {
    let tx = 0;
    let ty = 0;

    if (score >= 0 && score <= 150) {
      tx = 46;
      ty = 235;
    } else if (score > 150 && score <= 300) {
      tx = 232;
      ty = 162;
    } else if (score > 300 && score <= 700) {
      tx = 46;
      ty = 103;
    } else if (score > 700 && score <= 1000) {
      tx = 248;
      ty = 51;
    }

    return { tx, ty };
  }

  calculatePosition(score: number): { cx: number; cy: number } {
    let cx = 0;
    let cy = 0;

    if (score >= 0 && score <= 50) {
      cx = 40 + (score / 50) * (110 - 40);
      cy = 5 + (score / 50) * (10 - 5);
    } else if (score > 50 && score <= 100) {
      cx = 110 + ((score - 50) / 50) * (175 - 110);
      cy = 10 + ((score - 50) / 50) * (15 - 10);
    } else if (score > 100 && score <= 150) {
      cx = 175 + ((score - 100) / 50) * (205 - 175);
      cy = 15 - ((score - 100) / 50) * 50;
    } else if (score > 150 && score <= 200) {
      cx = (score / 200) * -50;
      cy = (score / 200) * -5;
    } else if (score > 200 && score <= 250) {
      cx = -50 + ((score - 50) / 200) * (-95 - -50);
      cy = -5 + ((score - 50) / 200) * (-8 - -5);
    } else if (score > 250 && score <= 300) {
      cx = -95 + ((score - 100) / 200) * (-160 - -95);
      cy = ((score - 100) / 200) * (-25 - -6);
    } else if (score > 300 && score <= 600) {
      cx = 40 + ((score - 300) / (600 - 300)) * (180 - 40);
      cy = 0;
    } else if (score > 600 && score <= 650) {
      cx = 180 + ((score - 600) / (650 - 600)) * (200 - 180);
      cy = -5;
    } else if (score > 650 && score <= 700) {
      cx = 200 + ((score - 650) / (700 - 650)) * (210 - 200);
      cy = -9;
    } else if (score > 700 && score <= 735) {
      cx = -4 + (score / 735) * (-15 - -4);
      cy = -7;
    } else if (score > 735 && score <= 770) {
      cx = -15 + ((score - 735) / (770 - 735)) * (-25 - -15);
      cy = -10;
    } else if (score > 770 && score <= 800) {
      cx = -25 + ((score - 770) / (800 - 770)) * (-50 - -25);
      cy = -15;
    } else if (score > 800 && score <= 1000) {
      cx = -50 + ((score - 800) / (1000 - 800)) * (-190 - -50);
      cy = -18;
    }

    return { cx, cy };
  }
}
