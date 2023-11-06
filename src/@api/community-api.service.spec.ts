import { TestBed } from '@angular/core/testing';

import { CommunityApiService } from './community-api.service';

describe('CommunityApiService', () => {
  let service: CommunityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
