import { Component } from '@angular/core';

interface Arbitro {
  nombre: string;
  deporte: string;
  descripcion: string;
  modalId: string;
}

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.scss']
})
export class RefereeComponent {

  // Texto del buscador
  buscador: string = '';

  // Lista de árbitros
  arbitros: Arbitro[] = [
    { nombre: 'Leo Messi', deporte: 'Fútbol', descripcion: 'Experiencia: 3 años', modalId: 'modalArbitro1' },
    { nombre: 'Paul Gasol', deporte: 'Baloncesto', descripcion: 'Partidos arbitrados: 12', modalId: 'modalArbitro2' }
  ];

  // Getter filtrado dinámico
  get arbitrosFiltrados() {
    const texto = this.buscador.toLowerCase();
    return this.arbitros.filter(a => a.nombre.toLowerCase().includes(texto));
  }

}

