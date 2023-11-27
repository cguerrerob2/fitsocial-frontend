import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

export interface DataExercises {
  id: number;
  exercise_Name: string;
  description_URL: string;
  exercise_Image: string;
  exercise_Image1: string;
  muscle_gp_details: string;
  muscle_gp: string;
  equipment_details: string;
  equipment: string;
  rating: string;
  description: string;
}

export interface SaveDataExercise {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataExercisesService {
  httpClient = inject(HttpClient)
  private apiUrl = 'http://localhost:8080/searchtraining/';

  constructor(private http: HttpClient) { }

  async getListExercises() {
    return lastValueFrom(this.httpClient.get<DataExercises[]>('http://localhost:8080/searchtraining/'));
  }

  async saveExercise(exercises: DataExercises) {
    return lastValueFrom(this.httpClient.post<SaveDataExercise>('http://localhost:8080/searchtraining/', exercises));
  }
}