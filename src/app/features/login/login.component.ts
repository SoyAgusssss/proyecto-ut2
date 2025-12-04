import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(form: NgForm) {
    if (!form.valid) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const data = {
  usuario: this.usuario,
  password: this.password
};

    this.http.post('http://localhost:3000/api/usuarios/login', data)
      .subscribe({
        next: (res: any) => {
          console.log('Login correcto:', res);
          alert(`Bienvenido ${res.usuario.usuario}`);
          this.router.navigate(['/home']); // redirige a home
        },
        error: (err) => {
          console.error('Error login:', err);
          alert(err.error?.mensaje || 'Error en login');
        }
      });
  }
}






