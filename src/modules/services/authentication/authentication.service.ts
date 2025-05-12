import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:5000/';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('role');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "api/auth/login", user).pipe(tap(res => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('role', JSON.stringify(res.result));
        this.currentUserSubject.next(res.result);
      }
    }));
  }
}
