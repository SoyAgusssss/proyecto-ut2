import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(form: NgForm) {
    if (!form.valid) {
      alert('Por favor completa todos los campos.');
      return;
    }

    this.authService.login(this.usuario, this.password)
      .subscribe({
        next: (res: any) => {
          console.log('Login correcto:', res);
          alert(`Bienvenido ${res.usuario.usuario}`);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Error login:', err);
          alert(err.error?.mensaje || 'Error en login');
        }
      });
  }
}







