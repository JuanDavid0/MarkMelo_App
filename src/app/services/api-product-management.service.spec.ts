import { TestBed } from '@angular/core/testing';

import { ApiProductManagementService } from './api-product-management.service';

describe('ApiProductManagementService', () => {
  let service: ApiProductManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProductManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
