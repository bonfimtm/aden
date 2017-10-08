import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostFormComponent } from './admin-post-form.component';

describe('AdminPostFormComponent', () => {
  let component: AdminPostFormComponent;
  let fixture: ComponentFixture<AdminPostFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
