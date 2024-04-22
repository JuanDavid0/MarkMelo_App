import { TestBed } from '@angular/core/testing';

import { AuthAccessGuard } from './auth-access.guard';

describe('AuthAccessGuard', () => {
  let guard: AuthAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
