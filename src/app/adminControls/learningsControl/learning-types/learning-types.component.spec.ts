import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningTypesComponent } from './learning-types.component';

describe('LearningTypesComponent', () => {
  let component: LearningTypesComponent;
  let fixture: ComponentFixture<LearningTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
