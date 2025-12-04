import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements AfterViewInit {

  @ViewChild('noticiasCarousel', { static: false }) carousel!: ElementRef;
  @ViewChild('carruselContador', { static: false }) contador!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const carouselEl = this.carousel.nativeElement;
    const slides = carouselEl.querySelectorAll('.carousel-item');
    const contadorEl = this.contador.nativeElement;

    const updateCounter = (idx: number) => {
      contadorEl.textContent = `(Noticia ${idx + 1} de ${slides.length})`;
    };

    // Inicializamos el contador en la primera diapositiva
    updateCounter(0);

    // Evento de Bootstrap al cambiar de diapositiva
    carouselEl.addEventListener('slid.bs.carousel', (event: any) => {
      updateCounter(event.to);
    });
  }
}

