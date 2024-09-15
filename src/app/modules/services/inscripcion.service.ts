import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class InscripcionService {

  constructor(
    private http: HttpClient
  ) { }


  baseUrl: string = 'http://localhost:3000'



  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/api/auth/login", data)
  }


  liberarManilla(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/api/identificadores/persona/${id}`)
  }



  saveUserData(data: any) {
    sessionStorage.setItem('user', JSON.stringify(data))
  }

  getUserData(): Observable<any> {
    return JSON.parse(sessionStorage.getItem('user')!)
  }

  saveUserToken(token: string) {
    sessionStorage.setItem('token', token)
  }

  getUserToken() {
    return sessionStorage.getItem('token')
  }

  saveAdmin(rol: string) {
    sessionStorage.setItem('rol', rol)
  }

  getAdmin() {
    return sessionStorage.getItem('rol')
  }

}
