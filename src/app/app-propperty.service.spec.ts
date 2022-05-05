import { TestBed } from '@angular/core/testing';

import { AppProppertyService } from './app-propperty.service';

describe('AppProppertyService', () => {
  let service: AppProppertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppProppertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
