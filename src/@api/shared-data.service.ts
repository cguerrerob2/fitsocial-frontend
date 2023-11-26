// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exercises, ExercisesTemplatesService } from 'src/@api/exercises-templates.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedExerciseSubject: BehaviorSubject<Exercises | null> = new BehaviorSubject<Exercises | null>(null);

  setSelectedExercise(exercise: Exercises | null) {
    this.selectedExerciseSubject.next(exercise);
  }

  getSelectedExercise(): Observable<Exercises | null> {
    return this.selectedExerciseSubject.asObservable();
  }
}
