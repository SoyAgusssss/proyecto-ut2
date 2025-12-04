import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.username || !this.password) return;

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          switch(res.role) {
            case 'usuario': this.router.navigate(['/index_usuario']); break;
            case 'administrador': this.router.navigate(['/index_administrador']); break;
            case 'capitan': this.router.navigate(['/index_capitan']); break;
            case 'arbitro': this.router.navigate(['/index_arbitro']); break;
          }
        } else {
          alert(res.message || 'Usuario o contraseña incorrectos');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error de conexión con el servidor');
      }
    });
  }
}


