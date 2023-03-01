import { TestBed } from '@angular/core/testing';

import { ExpCheckGuard } from './exp-check.guard';

describe('ExpCheckGuard', () => {
  let guard: ExpCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExpCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
