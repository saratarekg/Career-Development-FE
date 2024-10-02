import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeUserComponent } from './freeze-user.component';

describe('FreezeUserComponent', () => {
  let component: FreezeUserComponent;
  let fixture: ComponentFixture<FreezeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreezeUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreezeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
