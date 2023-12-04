import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/@api/auth.service';
import { DataExercises, DataExercisesService } from 'src/@api/data-exercises.service';
import { Exercises } from 'src/@api/exercises-templates.service';
import { SharedDataService } from 'src/@api/shared-data.service';
import { Trainings, TrainingsService } from 'src/@api/trainings.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private sharedDataService: SharedDataService,
    private dataExerciseService: DataExercisesService,
    private trainingsService: TrainingsService
  ) {}

  userEmail: string | null = null;
  selectedExercise: Exercises | null = null;
  public deleteSuccess = false;
  isOpen = false;
  dataExercises: DataExercises[] = [];
  trainingData: Trainings[] = [];  // Asegúrate de que esta línea esté presente
  public completeTraining = false; // Variable para controlar si el inicio de sesión fue exitoso
  public exerciseCompleted = false; // Variable para controlar si el inicio de sesión fue exitoso

  async ngOnInit(): Promise<void> {
    // Suscríbete al observable para recibir actualizaciones del correo electrónico del usuario
    this.auth.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });

    this.sharedDataService.getSelectedExercise().subscribe((exercise) => {
      this.selectedExercise = exercise;
    });

    this.dataExercises = await this.dataExerciseService.getListExercises();
    this.trainingData = await this.trainingsService.getTrainings();
  }

  indexReturn() {
    this.router.navigate(['/home']);
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  completarRutina() {
    this.toggleModal();

    this.completeTraining = true; // Marca como inicio de sesión exitoso
    setTimeout(() => {
      this.completeTraining = false; // Marca como inicio de sesión exitoso
    }, 1000); // Cambia el tiempo (en milisegundos) según tus necesidades
    
  }

  onExerciseCompletionChange(training: any, exercise: any): void {
    // Actualizar el estado de completado del ejercicio
    this.exerciseCompleted = true;
    // Guarda en memoria exerciseCompleted
    localStorage.setItem('exerciseCompleted', JSON.stringify(this.exerciseCompleted));
    
  }
}
