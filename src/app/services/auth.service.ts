import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/currentUser.model';
import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<CurrentUser | null>;
  public currentUser: Observable<CurrentUser | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(`${environment.apiUrl}/api-token-auth/`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  signup(data: Signup) {
    return this.http.post(`${environment.apiUrl}/users/`, data)
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
