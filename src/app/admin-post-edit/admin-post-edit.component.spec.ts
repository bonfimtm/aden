import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostEditComponent } from './admin-post-edit.component';

describe('AdminPostEditComponent', () => {
  let component: AdminPostEditComponent;
  let fixture: ComponentFixture<AdminPostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
