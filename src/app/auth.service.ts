import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api/v1/auth';
  private tokenKey: string = 'jwt';

  constructor(private http: HttpClient) {}
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap(response => {
        console.log('Răspuns de la server în AuthService:', response);
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
