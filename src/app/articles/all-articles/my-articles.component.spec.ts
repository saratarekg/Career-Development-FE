import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArticlesComponent } from './all-articles.component';

describe('MyLearningsComponent', () => {
  let component: MyArticlesComponent;
  let fixture: ComponentFixture<MyArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
