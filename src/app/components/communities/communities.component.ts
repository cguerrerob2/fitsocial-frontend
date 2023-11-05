import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent {
  constructor(private router: Router) {}

  indexReturn() {
    this.router.navigate(['/home']);
  }
}
