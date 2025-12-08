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
    rol: 'usuario',
    equipo: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  registrar(form: NgForm) {
    if (!form.valid) return alert('Completa todos los campos');

    this.authService.registrar(this.nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (err: any) => alert(err.error?.mensaje || 'Error registro')
    });
  }
}


