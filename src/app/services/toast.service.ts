import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public value: [string, string] = ['', '']

  passAlert: Subject<[string, string]> = new Subject();

  constructor() { }

  alert(msg: string, state: string) {
    this.value = [msg, state]
    this.passAlert.next(this.value)
  }
}
