import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}
  
  redirectToLogin() {
    this.router.navigate(['login']); // Esta ruta debe coincidir con la configuración de tu enrutador
  }
  
  indexReturn() {
    this.router.navigate(['/home']);
  }
}
