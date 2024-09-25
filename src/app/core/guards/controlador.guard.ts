import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ControladorGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = next.data['requiredRoles'] as string[];
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('rol');

    // Si no existe el token, redirige al login
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica si el usuario tiene un rol asignado
    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica si el rol del usuario coincide con los roles requeridos
    if (requiredRoles && requiredRoles.includes(userRole)) {
      return true;
    }

    // Si el rol del usuario no tiene permisos para acceder, redirige a una página 404
    this.router.navigate(['/profile/404']);
    return false;
  }
}
