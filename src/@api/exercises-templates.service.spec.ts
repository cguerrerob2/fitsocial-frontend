import { TestBed } from '@angular/core/testing';

import { ExercisesTemplatesService } from './exercises-templates.service';

describe('ExercisesTemplatesService', () => {
  let service: ExercisesTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
