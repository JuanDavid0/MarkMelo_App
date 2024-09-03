import { TestBed } from '@angular/core/testing';

import { AuthLoginGuard } from './auth-admin.guard';

describe('AuthLoginGuard', () => {
  let guard: AuthLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
