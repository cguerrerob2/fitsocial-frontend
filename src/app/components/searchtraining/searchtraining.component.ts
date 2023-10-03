import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchtraining',
  templateUrl: './searchtraining.component.html',
  styleUrls: ['./searchtraining.component.scss']
})
export class SearchtrainingComponent {
  constructor(private router: Router) {}

  indexReturn() {
    this.router.navigate(['/home']);
  }
}
