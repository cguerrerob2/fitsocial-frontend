import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Exercises, ExercisesTemplatesService } from 'src/@api/exercises-templates.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/@api/shared-data.service';
import { AuthService } from 'src/@api/auth.service';
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
    private auth: AuthService
  ) {}

  userEmail: string | null = null;
  selectedExercise: Exercises | null = null;
  searchTrainingsApiService = inject(ExercisesTemplatesService);

  async ngOnInit(): Promise<void> {
    this.auth.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });

    this.exercisesTemplates = await this.searchTrainingsApiService.getListExercises();

    this.makeApiRequest();
  }

  indexReturn() {
    this.router.navigate(['/home']);
  }

  exercisesTemplates: Exercises[] = [];

  isOpen = false;
  public addTrainingSuccess = false; // Variable para controlar si el inicio de sesión fue exitoso

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

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

  async makeApiRequest() {
    const options = {
      method: 'POST',
      url: 'https://chatgpt-ai-chat-bot.p.rapidapi.com/ask',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '3db6d9eac8mshf98c265a179e9c9p103d09jsn028889f9ef20',
        'X-RapidAPI-Host': 'chatgpt-ai-chat-bot.p.rapidapi.com'
      },
      data: {
        query: 'What is google?'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
export { Exercises };