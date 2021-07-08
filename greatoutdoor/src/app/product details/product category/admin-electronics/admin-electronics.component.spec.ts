import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminElectronicsComponent } from './admin-electronics.component';

describe('AdminElectronicsComponent', () => {
  let component: AdminElectronicsComponent;
  let fixture: ComponentFixture<AdminElectronicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminElectronicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminElectronicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
