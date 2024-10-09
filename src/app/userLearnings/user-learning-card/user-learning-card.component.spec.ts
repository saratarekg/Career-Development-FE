import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLearningCardComponent } from './user-learning-card.component';

describe('LearningCardComponent', () => {
  let component: UserLearningCardComponent;
  let fixture: ComponentFixture<UserLearningCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLearningCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLearningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
