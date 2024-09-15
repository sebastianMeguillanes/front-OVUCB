import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InscripcionService } from '../../services/inscripcion.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  attemptCount = 0;
  timeoutHandle: any;
  constructor(
    private inscriptionService: InscripcionService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login() {
    if (this.attemptCount >= 4) {
      this.toastr.error('Demaciados intentos fallidos. Por favor, intente de nuevo más tarde.');
      return;
    }

    this.inscriptionService.login(this.loginData).subscribe({
      next: (response) => {
        sessionStorage.setItem('rol', "sociedad");
        this.inscriptionService.saveUserToken(response.token);
        this.router.navigate(['/admin']);
        this.toastr.success('Inicio Exitoso!');
        this.resetAttemptCount();
      },
      error: (error) => {
        this.attemptCount++;
        if (this.attemptCount < 4) {
          this.toastr.error('Credenciales inválidas. Por favor, intente de nuevo.');
        } else {
          this.toastr.error('por favor, intente de nuevo más tarde.');
          this.startResetTimer();
        }
      }
    });
  }

  startResetTimer() {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      this.attemptCount = 0;
    }, 300000); // 5 minutos
  }

  resetAttemptCount() {
    clearTimeout(this.timeoutHandle);
    this.attemptCount = 0;
  }
}
