import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/@api/auth.service';
import { Exercises } from 'src/@api/exercises-templates.service';
import { SharedDataService } from 'src/@api/shared-data.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private sharedDataService: SharedDataService
  ) {}

  userEmail: string | null = null;
  selectedExercise: Exercises | null = null;
  public deleteSuccess = false;
  isOpen = false;

  ngOnInit(): void {
    // Suscríbete al observable para recibir actualizaciones del correo electrónico del usuario
    this.auth.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });

    this.sharedDataService.getSelectedExercise().subscribe((exercise) => {
      this.selectedExercise = exercise;
    });

  }

  indexReturn() {
    this.router.navigate(['/home']);
  }

  deleteExercise() {
    this.selectedExercise = null;
    setTimeout(() => {
      this.deleteSuccess = true; // Marca como inicio de sesión exitoso
    }, 1000); // Cambia el tiempo (en milisegundos) según tus necesidades
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }
}
