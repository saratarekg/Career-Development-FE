import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScoreboardService } from '../../services/scoreboard/scoreboard.service';
import { ScoreboardComponent } from './scoreboard.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { UserScoreboardDTO } from '../../models/userDto';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let scoreboardService: jasmine.SpyObj<ScoreboardService>;

  const mockScoreboard: UserScoreboardDTO[] = [
    { rank: 1, firstName: 'John', lastName: 'Doe', score: 1000, levelName: 'Legend' },
    { rank: 2, firstName: 'Jane',lastName:'Smith', score: 800, levelName: 'Dynamo' },
  ];

  beforeEach(async () => {
    const scoreboardServiceSpy = jasmine.createSpyObj('ScoreboardService', ['getScoreboard']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ScoreboardComponent
      ],
      providers: [{ provide: ScoreboardService, useValue: scoreboardServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    scoreboardService = TestBed.inject(ScoreboardService) as jasmine.SpyObj<ScoreboardService>;

    scoreboardService.getScoreboard.and.returnValue(of(mockScoreboard)); // Mock data
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load the scoreboard data on init', () => {
    scoreboardService.getScoreboard.and.returnValue(of(mockScoreboard));
    fixture.detectChanges();

    expect(component.userScoreboard.length).toBe(2);
    expect(component.dataSource.data).toEqual(mockScoreboard);
  });

  it('should apply sorting by score in descending order by default', () => {
    scoreboardService.getScoreboard.and.returnValue(of(mockScoreboard));
    fixture.detectChanges();

    const sortedData = component.dataSource.data;
    expect(sortedData[0].score).toBe(1000);
  });

  it('should filter the data based on the input value', () => {
    scoreboardService.getScoreboard.and.returnValue(of(mockScoreboard));
    fixture.detectChanges();

    const filterEvent = { target: { value: 'John' } } as unknown as Event;
    component.applyFilter(filterEvent);

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].firstName).toBe('John');
  });

  it('should not break on empty data from service', () => {
    scoreboardService.getScoreboard.and.returnValue(of([]));
    fixture.detectChanges();

    expect(component.userScoreboard.length).toBe(0);
    expect(component.dataSource.data.length).toBe(0);
  });
});
