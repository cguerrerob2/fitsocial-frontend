import { TestBed } from '@angular/core/testing';

import { DataExercisesService } from './data-exercises.service';

describe('DataExercisesService', () => {
  let service: DataExercisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExercisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
