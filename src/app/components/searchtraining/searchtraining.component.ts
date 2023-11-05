import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Exercises, ExercisesTemplatesService } from 'src/@api/exercises-templates.service';
// import { Exercises } from 'src/app/app.component';

@Component({
  selector: 'app-searchtraining',
  templateUrl: './searchtraining.component.html',
  styleUrls: ['./searchtraining.component.scss']
})
export class SearchtrainingComponent implements OnInit {
  constructor(
    private router: Router,
    // private exerciseApiService: ExercisesTemplatesService
  ) {}

  searchTrainingsApiService = inject(ExercisesTemplatesService)

  async ngOnInit(): Promise<void> {
    this.exercisesTemplates = await this.searchTrainingsApiService.getListExercises();
  }

  indexReturn() {
    this.router.navigate(['/home']);
  }

  exercisesTemplates: Exercises[] = []

  isOpen = false;

  toggleModal() {
    this.isOpen = !this.isOpen;
  }
}
