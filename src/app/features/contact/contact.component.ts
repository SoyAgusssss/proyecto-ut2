import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('contactoForm') contactoForm!: ElementRef<HTMLFormElement>;
  @ViewChild('toastContacto') toastContacto!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    // @ts-ignore (Bootstrap no tiene tipos)
    const toast = new bootstrap.Toast(this.toastContacto.nativeElement);
    toast.show();

    this.contactoForm.nativeElement.reset();
  }
}

