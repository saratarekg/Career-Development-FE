import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerControlsComponent } from './manager-controls.component';

describe('ManagerControlsComponent', () => {
  let component: ManagerControlsComponent;
  let fixture: ComponentFixture<ManagerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
