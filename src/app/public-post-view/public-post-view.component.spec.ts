import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPostViewComponent } from './public-post-view.component';

describe('PublicPostViewComponent', () => {
  let component: PublicPostViewComponent;
  let fixture: ComponentFixture<PublicPostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
