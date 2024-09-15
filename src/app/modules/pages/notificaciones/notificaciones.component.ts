import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './../../services/notificacion.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { NotificationPayload } from '../../../core/models/notification.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ToastModule, ConfirmDialogModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NotificacionesComponent {
  
  showOptionalFields: boolean = false;
  notificacion: NotificationPayload = {
    title: '',
    body: '',
    icon: '',
    click: '',
    id_sede: '',
    id_usuario: [],
    p: true,
    m: false,
    e: false
  };

  sedes = [
    { id: 'jqlueV17T%252btzqDRTjDXGcg==', nombre: 'Sede Tarija' },
    { id: '2', nombre: 'Sede Cochabamba' },
    { id: '3', nombre: 'Sede La Paz' },
  ];

  constructor(
    private notificationService: NotificationService,
    private toastrService: ToastrService,
    private confirmationService: ConfirmationService
  ) { }

  handleSedeChange() {
    if (this.notificacion && this.notificacion.id_sede) {
      this.notificacion.id_usuario = [];
    }
  }

  parseUsers(input: string): string[] {
    return input.split(',')
                .map(id_usuario => id_usuario.trim())
                .filter(id_usuario => id_usuario.length > 0);
  }

  sendNotification() {
    if (!this.notificacion.title || !this.notificacion.body) {
      this.toastrService.error('El título y el cuerpo de la notificación son requeridos.');
      return;
    }

    if (!this.notificacion.id_sede && (!this.notificacion.id_usuario || this.notificacion.id_usuario.length === 0)) {
      this.toastrService.error('Debe seleccionar una sede o al menos un usuario.');
      return;
    }

    // Mostrar el cuadro de confirmación
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas enviar esta notificación?',
      header: 'Confirmar Envío',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onConfirmSend();
      },
      reject: () => {
        this.toastrService.info('Envío cancelado');
      }
    });
  }

  onConfirmSend() {
    if (!this.notificacion.id_sede) {
      this.notificacion.id_usuario = this.parseUsers((this.notificacion.id_usuario as unknown) as string);
    }
    this.toastrService.info('Enviando notificación...');
    this.notificationService.sendNotification(this.notificacion).subscribe(
      _response => {
        this.toastrService.success('Notificación enviada con éxito');
      },
      error => {
        this.toastrService.warning('Error al enviar correos:', error);
      }
    );
    this.resetForm();
  }

  resetForm() {
    this.notificacion = {
      id_usuario: [] as string[],
      title: '',
      body: '',
      icon: '',
      click: '',
      id_sede: '',
      p: true,
      m: false,
      e: false,
    };
  }
}
