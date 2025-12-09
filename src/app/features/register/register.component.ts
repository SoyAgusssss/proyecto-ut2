import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NuevoUsuario {
  usuario: string;
  email: string;
  password: string;
  rol: 'usuario' | 'admin' | 'capitan' | 'arbitro';
  equipo?: string;
  deporte: string;  // 👈 ahora obligatorio
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // Datos del usuario nuevo
  nuevoUsuario: NuevoUsuario = {
    usuario: '',
    email: '',
    password: '',
    rol: 'usuario',
    equipo: '',
    deporte: ''    // 👈 necesario para el desplegable de deportes
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(form: NgForm) {
    if (!form.valid) {
      return alert('Completa todos los campos');
    }

    this.authService.registrar(this.nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        alert(err.error?.mensaje || 'Error registro');
      }
    });
  }
}



