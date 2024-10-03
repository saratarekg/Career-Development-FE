import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTitleComponent } from './assign-title.component';

describe('AssignTitleComponent', () => {
  let component: AssignTitleComponent;
  let fixture: ComponentFixture<AssignTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
