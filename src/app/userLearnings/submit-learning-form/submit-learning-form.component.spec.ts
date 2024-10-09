import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLearningFormComponent } from './submit-learning-form.component';

describe('SubmitLearningFormComponent', () => {
  let component: SubmitLearningFormComponent;
  let fixture: ComponentFixture<SubmitLearningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitLearningFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitLearningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
