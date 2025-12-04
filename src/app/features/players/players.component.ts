import { Component } from '@angular/core';

interface Jugador {
  nombre: string;
  deporte: string;
  descripcion: string;
  modalId: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {

  // Texto del buscador
  buscador: string = '';

  // Datos de ejemplo (puedes cargarlos desde API más adelante)
  jugadores: Jugador[] = [
    { nombre: 'Ana Torres', deporte: 'Fútbol', descripcion: 'Delantera | 7 goles', modalId: 'modalJugador1' },
    { nombre: 'Mario Mera', deporte: 'Baloncesto', descripcion: 'Base | 18 ptos', modalId: 'modalJugador2' },
    { nombre: 'Paco Pozo', deporte: 'Tenis', descripcion: 'Derecho | 3 partidos ganados', modalId: 'modalJugador3' },
    { nombre: 'Pedro Picapiedra', deporte: 'Voleibol', descripcion: 'Defensa | 4 partidos ganados', modalId: 'modalJugador4' }
  ];

  // Filtrado dinámico
  get jugadoresFiltrados() {
    const texto = this.buscador.toLowerCase();
    return this.jugadores.filter(j =>
      j.nombre.toLowerCase().includes(texto)
    );
  }

}

