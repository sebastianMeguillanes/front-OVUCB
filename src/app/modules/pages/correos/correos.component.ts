import { NotificationService } from './../../services/notificacion.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { EmailPayload } from '../../../core/models/email.model';
import { Payload } from '../../../core/models/payload.model';



@Component({
  selector: 'app-correos',
  standalone: true,
  imports: [ReactiveFormsModule,    FormsModule, CommonModule],
  templateUrl: './correos.component.html',
  styleUrl: './correos.component.scss'
})


export class CorreosComponent {


  constructor(
    private NotificationService: NotificationService,
    private toastrService: ToastrService
  ) { }
  emails: EmailPayload[] = [{ correos: [], titulo: '', cuerpo: '' }];


  addEmail() {
    if (this.emails.length < 4) {
      this.emails.push({ correos: [], titulo: '', cuerpo: '' });
    } else {
      this.toastrService.warning('No se pueden agregar más de 4 correos.');
    }
  }
  removeEmail(index: number) {
    this.emails.splice(index, 1);
  }

  parseEmails(input: string): string[] {
    return input.split(',')
                .map(email => email.trim())
                .filter(email => email.length > 0);
  }

  sendEmails() {
    this.emails.forEach(email => {
      email.correos = this.parseEmails((email.correos as unknown) as string);
    });

    const payload: Payload = { payload: this.emails };
    console.log('Payload:', payload);
    this.NotificationService.sendCorreos(payload).subscribe(
      _response => {
        alert('Correos enviados con éxito');
      },
      error => {
        console.error('Error al enviar correos:', error);
      }
    );
  }

}
