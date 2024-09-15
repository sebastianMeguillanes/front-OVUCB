import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private confirmationSubject = new Subject<void>();
  confirmation$ = this.confirmationSubject.asObservable();

  requestConfirmation() {
    this.confirmationSubject.next();
  }

  confirm() {
    this.confirmationSubject.next();
  }

  cancel() {
    this.confirmationSubject.next();
  }
}
