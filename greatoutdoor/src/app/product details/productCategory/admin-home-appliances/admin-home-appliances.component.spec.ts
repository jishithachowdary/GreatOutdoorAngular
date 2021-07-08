import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeAppliancesComponent } from './admin-home-appliances.component';

describe('AdminHomeAppliancesComponent', () => {
  let component: AdminHomeAppliancesComponent;
  let fixture: ComponentFixture<AdminHomeAppliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeAppliancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeAppliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
