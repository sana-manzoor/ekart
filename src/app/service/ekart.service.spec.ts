import { TestBed } from '@angular/core/testing';

import { EkartService } from './ekart.service';

describe('EkartService', () => {
  let service: EkartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
