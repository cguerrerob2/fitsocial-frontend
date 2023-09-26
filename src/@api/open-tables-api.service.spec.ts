import { TestBed } from '@angular/core/testing';

import { OpenTablesApiService } from './open-tables-api.service';

describe('OpenTablesApiService', () => {
  let service: OpenTablesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTablesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
