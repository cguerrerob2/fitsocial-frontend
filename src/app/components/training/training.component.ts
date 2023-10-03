import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  constructor(private router: Router) {}

  indexReturn() {
    this.router.navigate(['/home']);
  }
}
