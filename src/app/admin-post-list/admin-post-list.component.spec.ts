import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostListComponent } from './admin-post-list.component';

describe('AdminPostListComponent', () => {
  let component: AdminPostListComponent;
  let fixture: ComponentFixture<AdminPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
