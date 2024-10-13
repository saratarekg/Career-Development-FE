import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArticleCardComponent } from './user-article-card.component';

describe('LearningCardComponent', () => {
  let component: UserArticleCardComponent;
  let fixture: ComponentFixture<UserArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserArticleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
