// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Auth, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {

    return this.http.post<Auth>(this.apiUrl, { email, password }).pipe(
      tap((res) => {
        // console.log(res.user.role)
        localStorage.setItem('token', res.token!);
        localStorage.setItem('role', res.user.role);     
        localStorage.setItem('user_name', res.user.nom); 
      })
    );
  }



  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); 
  }

  logout(): void {
    localStorage.clear();
  }
  
}
