import { Component, OnInit, inject } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Exercises, ExercisesTemplatesService } from 'src/@api/exercises-templates.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/@api/shared-data.service';
import { AuthService } from 'src/@api/auth.service';
import { DataExercisesService, DataExercises } from 'src/@api/data-exercises.service';
import { Trainings, TrainingsService } from 'src/@api/trainings.service';
import axios from 'axios';

@Component({
  selector: 'app-searchtraining',
  templateUrl: './searchtraining.component.html',
  styleUrls: ['./searchtraining.component.scss']
})
export class SearchtrainingComponent implements OnInit {
  constructor(
    private router: Router,
    private exerciseApiService: ExercisesTemplatesService,
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private auth: AuthService,
    private dataExerciseService: DataExercisesService,
    private trainingsService: TrainingsService
  ) {}

  // At the top of your component class
  reps: string = '12'; // default value, you can set it based on your requirement
  weight: string = '12'; // default value, you can set it based on your requirement

  userEmail: string | null = null;
  selectedExercise: Exercises | null = null;

  searchTrainingsApiService = inject(ExercisesTemplatesService);
  exercisesList = inject(DataExercisesService);
  trainingsApiService = inject(TrainingsService);
  
  showAlert: boolean = false;

  routine: DataExercises[] = [];

  async ngOnInit(): Promise<void> {
    this.auth.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });

    this.exercisesTemplates = await this.searchTrainingsApiService.getListExercises();

    this.dataExercises = await this.exercisesList.getListExercises();

    this.trainingData = await this.trainingsApiService.getTrainings();
  }

  indexReturn() {
    this.router.navigate(['/home']);
  }

  dataExercises: DataExercises[] = [];
  exercisesTemplates: Exercises[] = [];

  isOpen = false;
  public addTrainingSuccess = false; // Variable para controlar si el inicio de sesión fue exitoso

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  addRoutine(exercise: DataExercises) {
    this.routine.push(exercise);

    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000); // Cambia el tiempo (en milisegundos) según tus necesidades

    console.log(this.routine);
  }

  trainingData: Trainings[] = []; // Asigna el tipo de datos adecuado si es posible

  saveTraining(routine: DataExercises[]) {
    // Crea un nuevo entrenamiento con la lista de ejercicios proporcionada
    const newTraining: Trainings = {
      id: 0, // O el valor adecuado si ya tienes una lógica para generar IDs
      reps: this.reps, // Asigna los valores adecuados
      weight: this.weight, // Asigna los valores adecuados
      exercises: routine.map(exercise => ({
        id: exercise.id || 0, // Asegúrate de manejar el caso donde el id pueda ser nulo
        exercise_Name: exercise.exercise_Name || '',
        description_URL: exercise.description_URL || '',
        exercise_Image: exercise.exercise_Image || '',
        exercise_Image1: exercise.exercise_Image1 || '',
        muscle_gp_details: exercise.muscle_gp_details || '',
        muscle_gp: exercise.muscle_gp || '',
        equipment_details: exercise.equipment_details || '',
        equipment: exercise.equipment || '',
        rating: exercise.rating || '',
        description: exercise.description || '',
      })),
    };
  
    // Guarda el nuevo entrenamiento
    this.trainingsService.saveTraining(newTraining).subscribe(
      (response) => {
        console.log('Entrenamiento guardado:', response);
        this.addTrainingSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/training']);
        }, 2000);
      },
      (error) => {
        console.error('Error al guardar el entrenamiento:', error);
      }
    );
  }

  closeAlert() {
    this.showAlert = false;
  }

  // Funcion Obsoleta
  async addTraining(exercise: Exercises) {
    // Asigna el ejercicio seleccionado
    this.selectedExercise = exercise;

    // Utiliza el servicio para compartir el ejercicio seleccionado
    this.sharedDataService.setSelectedExercise(exercise);

    // Llama al servicio para crear un nuevo entrenamiento y asociarlo al usuario
    await this.exerciseApiService.createTraining(exercise).toPromise();
    console.log('Entrenamiento añadido:', exercise);

    // Luego, redirige a la página de entrenamientos
    this.addTrainingSuccess = true; // Marca como inicio de sesión exitoso
    setTimeout(() => {
      this.router.navigate(['/training']); // Redirecciona a '/training' después de 2000 ms (2 segundos)
    }, 2000); // Cambia el tiempo (en milisegundos) según tus necesidades
  }

  public deleteSuccess = false;

  // Delete Trainings
  async deleteTraining(trainingId: number): Promise<void> {
    try {
      // Call your service method to delete the training by ID
      await this.trainingsService.deleteTraining(trainingId).toPromise();
  
      // Optionally, you can update your trainingData array to reflect the changes
      this.trainingData = this.trainingData.filter(training => training.id !== trainingId);
    } catch (error) {
      console.error('Error deleting training:', error);
    }

    // Notificacion Eliminar Rutina
    setTimeout(() => {
      this.deleteSuccess = true; // Marca como inicio de sesión exitoso
    }, 1000); // Cambia el tiempo (en milisegundos) según tus necesidades
  }

}
export { Exercises };