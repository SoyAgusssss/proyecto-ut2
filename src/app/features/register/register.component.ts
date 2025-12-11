import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TeamService, Team } from '../../services/team.service';

interface NuevoUsuario {
  usuario: string;
  email: string;
  password: string;
  rol: 'usuario' | 'capitan' | 'arbitro';
  equipo?: string;
  deporte?: string; // ya opcional, se asigna según el equipo
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nuevoUsuario: NuevoUsuario = {
    usuario: '',
    email: '',
    password: '',
    rol: 'usuario',
    equipo: ''
  };

  equipos: Team[] = [];

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.teamService.getTeams().subscribe(data => this.equipos = data);
  }

  registrar(form: NgForm) {
    if (!form.valid) return alert('Completa todos los campos');

    // Si el usuario elige un equipo, asignamos su deporte automáticamente
    if (this.nuevoUsuario.equipo) {
      const equipoSeleccionado = this.equipos.find(eq => eq.nombre === this.nuevoUsuario.equipo);
      if (equipoSeleccionado) {
        this.nuevoUsuario.deporte = equipoSeleccionado.deporte;
      }
    }

    // Si es árbitro, no asignamos equipo ni deporte
    if (this.nuevoUsuario.rol === 'arbitro') {
      this.nuevoUsuario.equipo = '';
      this.nuevoUsuario.deporte = '';
    }

    this.authService.registrar(this.nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (err: any) => alert(err.error?.mensaje || 'Error registro')
    });
  }
}






