import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSubjectsComponent } from './learning-subjects.component';

describe('LearningSubjectsComponent', () => {
  let component: LearningSubjectsComponent;
  let fixture: ComponentFixture<LearningSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
