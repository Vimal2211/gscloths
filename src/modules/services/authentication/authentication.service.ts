import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { enviornment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }
  getCurrentUser(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('role')) {
      return JSON.parse(localStorage.getItem('role') || '{}');
    }
  }
  login(user: any): Observable<any> {
    return this.http.post<any>(enviornment.url + "api/auth/login", user).pipe(tap(res => {
      localStorage.setItem('role', JSON.stringify(res.result));
    }));
  }
}
