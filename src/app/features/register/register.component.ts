import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NuevoUsuario {
  usuario: string;
  email: string;
  password: string;
  rol: 'usuario' | 'admin' | 'capitan' | 'arbitro';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  nuevoUsuario: NuevoUsuario = {
    usuario: '',
    email: '',
    password: '',
    rol: 'usuario' // valor por defecto
  };

  constructor(private authService: AuthService, private router: Router) {}

  registrar(form: NgForm) {
    if (!form.valid) {
      alert('Completa todos los campos.');
      return;
    }

    this.authService.registrar(this.nuevoUsuario)
      .subscribe({
        next: (res: any) => {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('Error registro:', err);
          alert(err.error?.mensaje || 'Error al registrar');
        }
      });
  }
}

