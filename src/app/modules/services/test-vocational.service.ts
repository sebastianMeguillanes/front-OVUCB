import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Student } from '../../core/models/estudiante.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TestVocationalService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  registerDataStudent(estudianteData: Student): Observable<any> {
    console.log('Estudiante:', estudianteData);
    return this.http.post(`${this.apiUrl}/api/students/`, estudianteData).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  getCarers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/vocational/careers`);
  }
}
