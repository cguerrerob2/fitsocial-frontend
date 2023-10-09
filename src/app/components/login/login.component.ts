import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario, UsersApiService } from 'src/@api/users-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (
    private fb:FormBuilder,
    private router: Router,
    private usersApi: UsersApiService
  ) {}

  public loginForm!:FormGroup;
  public loginSuccess = false; // Variable para controlar si el inicio de sesión fue exitoso

  ngOnInit(): void {
      this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  }

  public submitForm() {
    if (this.loginForm.invalid) {
      return;
    } else {
      // Obtén los datos del formulario
      const formData = this.loginForm.value;

      // Llama al servicio para registrar al usuario
      this.usersApi.register(formData).subscribe(
        (response) => {
          // Procesa la respuesta del servidor aquí
          this.loginSuccess = true; // Marca como inicio de sesión exitoso
          setTimeout(() => {
            this.router.navigate(['/training']); // Redirecciona a '/training' después de 2000 ms (2 segundos)
          }, 2000); // Cambia el tiempo (en milisegundos) según tus necesidades
        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error de registro:', error);
        }
      );
    }
  }

  nuevoUsuario: Usuario[] = []
}