import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardLevelsComponent } from './scoreboard-levels.component';

describe('ScoreboardLevelsComponent', () => {
  let component: ScoreboardLevelsComponent;
  let fixture: ComponentFixture<ScoreboardLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreboardLevelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreboardLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
