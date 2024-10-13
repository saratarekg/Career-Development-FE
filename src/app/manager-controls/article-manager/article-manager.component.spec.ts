import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManagerComponent } from './article-manager.component';

describe('ArticleManagerComponent', () => {
  let component: ArticleManagerComponent;
  let fixture: ComponentFixture<ArticleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
