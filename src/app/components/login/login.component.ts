import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (
    private fb:FormBuilder,
    private router: Router
  ) {}

  public loginForm!:FormGroup;
  public loginSuccess = false; // Variable para controlar si el inicio de sesión fue exitoso

  ngOnInit(): void {
      this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      usuario: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  public submitForm() {
    if (this.loginForm.invalid) {
      return
    } else {
      this.loginSuccess = true; // Marca como inicio de sesión exitoso
      // this.router.navigate(['/home']);
      console.log(this.loginForm.value)
    }
  }

  nuevoUsuario: Usuario = {
    id: 0, // ID User reference
    email: '',
    password: '',
    country: '',
    weight: 0,
    height: 0
  };
}