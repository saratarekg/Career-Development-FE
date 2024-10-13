import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningManagerComponent } from './learning-manager.component';

describe('LearningManagerComponent', () => {
  let component: LearningManagerComponent;
  let fixture: ComponentFixture<LearningManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
