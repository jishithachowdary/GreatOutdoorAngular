import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminElectronincsComponent} from './admin-electronics.component';

describe('AdminElectronicsComponent', () => {
  let component: AdminElectronincsComponent;
  let fixture: ComponentFixture<AdminElectronincsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminElectronincsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminElectronincsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});