import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLearningsControlComponent } from './admin-learnings-control.component';

describe('AdminLearningsControlComponent', () => {
  let component: AdminLearningsControlComponent;
  let fixture: ComponentFixture<AdminLearningsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLearningsControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLearningsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
