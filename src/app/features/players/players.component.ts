import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Jugador {
  _id: string;
  usuario: string;
  deporte: string;
  equipo: string;
  modalId?: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  buscador = '';
  jugadores: Jugador[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getPorRol('usuario').subscribe({
      next: (data: Jugador[]) => {
        this.jugadores = data.map((j: Jugador) => ({
          ...j,
          modalId: `modalJugador_${j._id}`
        }));
      },
      error: () => alert('Error cargando jugadores')
    });
  }

  get jugadoresFiltrados() {
    const t = this.buscador.toLowerCase();
    return this.jugadores.filter(j =>
      j.usuario && j.usuario.toLowerCase().includes(t)
    );
  }
}




