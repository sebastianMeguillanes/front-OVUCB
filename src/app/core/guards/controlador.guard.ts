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

  admin = ''
  user = ''

  constructor(
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const requiredRoles = next.data['requiredRoles'] as string[];
    const token = sessionStorage.getItem('token')

    if (sessionStorage.getItem('rol') === 'sociedad') {
      this.admin = 'sociedad'
    } else {
      this.user = 'user'
    }


    if (!token) {
      if (requiredRoles && requiredRoles.includes('sociedad')) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/profile/404']);
      }
      return false;
    } else {
      if (this.admin === 'sociedad' && requiredRoles.includes('sociedad')) {
        return true
      } else {
        if (this.user === 'user' && requiredRoles.includes('user')) {
          return true
        } else {
          this.router.navigate(['/login']);
        }
      }
    }
    return false
  }

}



