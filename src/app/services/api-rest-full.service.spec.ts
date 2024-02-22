import { TestBed } from '@angular/core/testing';

import { ApiRestFullService } from './api-rest-full.service';

describe('ApiRestFullService', () => {
  let service: ApiRestFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRestFullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
