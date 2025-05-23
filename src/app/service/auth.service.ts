import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Services
  private http: HttpClient = inject(HttpClient);

  // Constants
  private readonly API_URL: string = 'http://localhost:8080/api/auth';
  private readonly tokenKey: string = 'access_token';

  constructor() { }

  login(credentials: {email: string, password: string}): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    )
  }

  register(data: {email: string, password: string}): Observable<{ message: string}> {
    return this.http.post<{message: string}>(`${this.API_URL}/register`, data);
  }
}
