import { TestBed } from '@angular/core/testing';

import { GrowthReoprtService } from './growth-report.service';

describe('GrowthReoprtService', () => {
  let service: GrowthReoprtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowthReoprtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
