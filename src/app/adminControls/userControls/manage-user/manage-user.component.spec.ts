import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserComponent } from './manage-user.component';

describe('FreezeUserComponent', () => {
  let component: ManageUserComponent;
  let fixture: ComponentFixture<ManageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
