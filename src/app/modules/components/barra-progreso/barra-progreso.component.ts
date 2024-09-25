import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-progreso',
  templateUrl: './barra-progreso.component.html',
  styleUrls: ['./barra-progreso.component.scss'],
  standalone: true
})
export class BarraProgresoComponent {
  @Input() value: number = 0;  // Porcentaje de progreso
  @Input() total: number = 0;  // Total de pasos/preguntas
  @Input() current: number = 0;  // Paso actual

  // Calcula las preguntas restantes
  get remaining() {
    return this.total - this.current;
  }

  // Formatea el valor del porcentaje como un número entero
  get formattedPercentage() {
    return Math.round(this.value);
  }
}
