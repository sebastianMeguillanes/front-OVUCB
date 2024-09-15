import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [DialogModule],
  template: `
    <p-dialog [(visible)]="visible" [modal]="true" [closable]="false" [style]="{width: '300px'}">
      <ng-template pTemplate="header">
        <h3>Confirmar Envío</h3>
      </ng-template>
      <ng-template pTemplate="content">
        <p>¿Estás seguro de que deseas enviar esta notificación?</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <div class="flex justify-end gap-2">
          <button class="bg-gray-500 text-white py-1 px-3 rounded-md" (click)="onCancel()">Cancelar</button>
          <button class="bg-primary text-white py-1 px-3 rounded-md" (click)="onConfirm()">Confirmar</button>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
      :host ::ng-deep .p-dialog .p-dialog-header {
        background-color: #f9fafb;
      }
      :host ::ng-deep .p-dialog .p-dialog-content {
        padding: 1rem;
      }
    `
  ]
})export class ConfirmDialogComponent {
  visible: boolean;

  constructor(private confirmDialogService: ConfirmDialogService) {
    this.confirmDialogService.confirmation$.subscribe(
      visible => this.visible = visible as unknown as boolean
    );
  }

  onConfirm(): void {
    this.confirmDialogService.confirm();
    this.visible = false;
  }

  onCancel(): void {
    this.confirmDialogService.cancel();
    this.visible = false;
  }
}
