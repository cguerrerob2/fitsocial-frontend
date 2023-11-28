import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { DataExercises } from './data-exercises.service';

export interface Trainings {
  id: number;
  exercises: DataExercises[];
  reps: string;
  weight: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  private apiUrl = 'http://localhost:8080/training/';

  constructor(private http: HttpClient) {}

  httpClient = inject(HttpClient)

  async getTrainings() {
    return lastValueFrom(this.httpClient.get<Trainings[]>(`${this.apiUrl}`));
  }

  // Guardar un nuevo entrenamiento
  saveTraining(routine: Trainings): Observable<any> {
    return this.http.post(`${this.apiUrl}`, routine);
  }

  deleteTraining(trainingId: number): Observable<void> {
    const url = `${this.apiUrl}${trainingId}`;
    return this.http.delete<void>(url);
  }
}
