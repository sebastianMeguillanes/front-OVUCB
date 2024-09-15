import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre',
  standalone: true
})
export class NombrePipe implements PipeTransform {

  transform(nombre: string): string {
    if (nombre) {
      const partes = nombre.split(' ');
      return partes[0]; // Devuelve la primera palabra
    }
    return '';
  }

}
