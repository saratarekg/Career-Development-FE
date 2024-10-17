import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JourneyMapComponent } from './journey-map.component';
import { JourneyMapService } from '../../services/journeyMap/journeyMap.service';
import { of } from 'rxjs';
import { UserJourneyDTO } from '../../models/userDto';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JourneyMapComponent', () => {
  let component: JourneyMapComponent;
  let fixture: ComponentFixture<JourneyMapComponent>;
  let journeyMapService: jasmine.SpyObj<JourneyMapService>;

  const mockUsers: UserJourneyDTO[] = [
    {
      firstName: 'Sara', score: 50,
      lastName: 'Tarek'
    },
    {
      firstName: 'Karim', score: 300,
      lastName: ''
    },
    {
      firstName: 'Dalia', score: 1000,
      lastName: ''
    },
  ];

  beforeEach(async () => {
    const journeyMapServiceSpy = jasmine.createSpyObj('JourneyMapService', ['getUserProgress']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, JourneyMapComponent],
      providers: [{ provide: JourneyMapService, useValue: journeyMapServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyMapComponent);
    component = fixture.componentInstance;
    journeyMapService = TestBed.inject(JourneyMapService) as jasmine.SpyObj<JourneyMapService>;
    journeyMapService.getUserProgress.and.returnValue(of(mockUsers));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    component.ngOnInit();
    expect(journeyMapService.getUserProgress).toHaveBeenCalledWith(0, 10);
    expect(component.users).toEqual(mockUsers);
  });

  it('should calculate correct transform for a score', () => {
    let result = component.calculateTransform(100);
    expect(result).toEqual({ tx: 46, ty: 235 });

    result = component.calculateTransform(500);
    expect(result).toEqual({ tx: 46, ty: 103 });

    result = component.calculateTransform(800);
    expect(result).toEqual({ tx: 248, ty: 51 });
  });

  it('should calculate correct position for a score', () => {
    let result = component.calculatePosition(50);
    expect(result).toEqual({ cx: 110, cy: 10 });

    result = component.calculatePosition(150);
    expect(result).toEqual({ cx: 205, cy: -35 });

    result = component.calculatePosition(900);
    expect(result).toEqual({ cx: -120, cy: -18 });
  });
});
