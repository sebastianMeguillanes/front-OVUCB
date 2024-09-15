import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InscripcionService } from '../../modules/services/inscripcion.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private inscripcionService: InscripcionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.inscripcionService.getUserToken()

    //comprobamos si hay token en session storage
    if (token != null) {
      authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }

    return next.handle(authReq);

  }

}

export const interceptorProvider = [ { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true } ]

