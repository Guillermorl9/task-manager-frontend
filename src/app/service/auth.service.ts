import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {UserApp} from "../model/UserApp";
import {LoginResponse} from "../model/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<UserApp | null> = new BehaviorSubject<UserApp | null>(null);
  public currentUser$: Observable<UserApp | null> = this.currentUser.asObservable();

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private readonly API_URL: string = 'http://localhost:8080/api/auth';
  private readonly tokenKey: string = 'access_token';
  private readonly userKey: string = 'access_user';

  constructor() {
    this.loadUserFromStorage();
  }

  loginWithGoogle(idToken: string): Observable<AuthResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/google`, { idToken }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.currentUser.next(response.user);
        this.router.navigate(['/home']);
      })
    )
  }

  login(credentials: {email: string, password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.currentUser.next(response.user);
        this.router.navigate(['/home']);
      })
    );
  }

  register(data: {email: string, password: string, name: string, lastname: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.currentUser.next(response.user);
        this.router.navigate(['/home']);
      })
    );
  }

  private loadUserFromStorage() {
    const userJson = localStorage.getItem(this.userKey);
    if (userJson) {
      this.currentUser.next(JSON.parse(userJson));
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

  get userId(): number | undefined | null {
    const user: UserApp | null = this.currentUser.getValue();
    return user ? user.id : null;
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

interface AuthResponse {
  token: string;
  user: UserApp;
}
