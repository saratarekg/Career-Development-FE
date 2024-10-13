import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitArticleFormComponent } from './submit-article-form.component';

describe('SubmitArticleFormComponent', () => {
  let component: SubmitArticleFormComponent;
  let fixture: ComponentFixture<SubmitArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitArticleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
