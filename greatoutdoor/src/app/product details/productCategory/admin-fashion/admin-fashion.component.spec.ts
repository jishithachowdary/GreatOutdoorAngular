import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFashionComponent } from './admin-fashion.component';

describe('AdminFashionComponent', () => {
  let component: AdminFashionComponent;
  let fixture: ComponentFixture<AdminFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFashionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
