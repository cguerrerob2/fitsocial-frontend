import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/@api/auth.service';
import { Usuario, UsersApiService } from 'src/@api/users-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public loginForm!: FormGroup;
  public loginError = false; // Variable para controlar si el inicio de sesión fue exitoso
  public loginSuccess = false; // Variable para controlar si el inicio de sesión fue exitoso

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submitForm() {
    if (this.loginForm.invalid) {
      return;
    } else {
      // Obtén los datos del formulario
      const formData = this.loginForm.value;

      // Llama al servicio para iniciar sesión
      this.authService.login(formData).subscribe(
        (response) => {
          // Procesa la respuesta del servidor aquí
          // Si el inicio de sesión es exitoso, redirige a la página de entrenamiento
          this.loginSuccess = true; // Marca como inicio de sesión exitoso
          setTimeout(() => {
            this.router.navigate(['/training']); // Redirecciona a '/training' después de 2000 ms (2 segundos)
          }, 2000); // Cambia el tiempo (en milisegundos) según tus necesidades
        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error de inicio de sesión:', error);
          this.loginError = true; // Muestra un mensaje de error en el formulario
        }
      );
    }
  }
}
