import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

export interface Exercises {
  id: number,
  title: string,
  exercises: string,
  reps: number
}

export interface SaveExercise {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExercisesTemplatesService {
  httpClient = inject(HttpClient)
  private apiUrl = 'http://localhost:8080/training/';

  constructor(private http: HttpClient) { }

  async getListExercises() {
    return lastValueFrom(this.httpClient.get<Exercises[]>('http://localhost:8080/training/'));
  }

  async saveExercise(exercises: Exercises) {
    return lastValueFrom(this.httpClient.post<SaveExercise>('http://localhost:8080/training/', exercises));
  }

  createTraining(exercise: any): Observable<any> {
    return this.http.post(this.apiUrl, exercise);
  }
}
