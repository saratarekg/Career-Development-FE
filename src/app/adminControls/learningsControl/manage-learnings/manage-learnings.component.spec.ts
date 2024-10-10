import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLearningsComponent } from './manage-learnings.component';

describe('ViewLearningsComponent', () => {
  let component: ManageLearningsComponent;
  let fixture: ComponentFixture<ManageLearningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLearningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLearningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
