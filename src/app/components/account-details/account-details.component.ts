import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersApiService, Usuario } from 'src/@api/users-api.service';
import { AuthService } from 'src/@api/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate('300ms')),
      transition('* => void', animate('300ms'))
    ])
  ]
})

export class AccountDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private usersApiService: UsersApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  usuario: any;
  editProfileForm!: FormGroup; // Formulario reactivo para editar el perfil
  userEmail: string | null = null;

  ngOnInit() {
    this.auth.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });
    
    // Realiza una solicitud HTTP para obtener los datos del usuario desde la base de datos
    this.usersApiService.getListUsers()
      .then((data: Usuario[]) => {
        if (data && data.length > 0) {
          this.usuario = data[data.length - 1]; // El último dato es el último en la lista ordenada
          console.log(this.usuario);
        } else {
          console.log('No se encontraron usuarios en la lista.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos del usuario', error);
      });
  }

  indexReturn() {
    this.router.navigate(['/home']);
  }

  isOpen = false;
  isProfileModalOpen = false;

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  toggleProfileModal() {
    this.isProfileModalOpen = !this.isProfileModalOpen;
  }  

}
