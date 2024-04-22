import { TestBed } from '@angular/core/testing';

import { ApiRestFulService } from './api-rest-ful.service';

describe('ApiRestFulService', () => {
  let service: ApiRestFulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRestFulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
