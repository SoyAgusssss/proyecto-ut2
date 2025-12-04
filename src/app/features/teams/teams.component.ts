import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements AfterViewInit {

  @ViewChild('filtradoEquipos') filtro!: ElementRef;
  @ViewChild('busquedaEquipo') busqueda!: ElementRef;
  @ViewChild('listadoEquipos') listado!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const cards = this.listado.nativeElement.querySelectorAll('.equipo-card');

    const filtrarEquipos = () => {
      const comp = this.filtro.nativeElement.value;
      const texto = this.busqueda.nativeElement.value.toLowerCase();

      cards.forEach((card: HTMLElement) => {
        // Obtener equipo
        const nombre = card.querySelector('.card-title')!.textContent!.toLowerCase();

        // Comparar competición
        const esComp = comp === "todos" || (card.dataset['competicion'] || '') === comp;

        // Comparar nombre
        const coincide = nombre.indexOf(texto) > -1;
        
        card.style.display = (esComp && coincide) ? "" : "none";
      });
    };

    // Ejecutar la primera vez para inicializar
    filtrarEquipos();

    // Añadir eventos
    this.filtro.nativeElement.addEventListener('change', filtrarEquipos);
    this.busqueda.nativeElement.addEventListener('input', filtrarEquipos);
  }
}

