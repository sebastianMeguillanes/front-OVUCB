// notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Payload } from '../../core/models/payload.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  sendNotification(notificationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/notifications/enviar`, notificationData).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }



  sendCorreos(payload: Payload): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/email/enviar`, payload).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
}
