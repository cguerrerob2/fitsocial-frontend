import { Component, inject, OnInit } from '@angular/core';
import { OpenTablesApiService } from '../@api/open-tables-api.service';
import { Router } from '@angular/router';

export interface Usuario {
  id: number; // Un identificador único para cada usuario
  email: string;
  password: string;
  country: string;
  height: number;
  weight: number;
}

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
