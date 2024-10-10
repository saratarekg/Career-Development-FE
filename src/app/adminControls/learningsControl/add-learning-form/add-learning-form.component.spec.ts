import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLearningFormComponent } from './add-learning-form.component';

describe('SubmitLearningFormComponent', () => {
  let component: AddLearningFormComponent;
  let fixture: ComponentFixture<AddLearningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLearningFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLearningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
