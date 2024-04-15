import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {TokenResponse} from "./TokenResponse";
import {User} from "../user/User";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UpdateProfile} from "../user/UpdateProfile";
import {UpdatePassword} from "../user/UpdatePassword";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host = environment.apiUrl;
  private token: string | null = null;
  private user: User | null = null;
  private loggedIn: boolean = false;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string): Observable<HttpResponse<TokenResponse> | HttpErrorResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',

    });

    let params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', environment.grant_type)
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret);

    return this.http.post<HttpResponse<TokenResponse>>(environment.keycloakUrl, params.toString(), {headers: headers});
  }

  public register(user: User): Observable<HttpResponse<User | HttpErrorResponse>> {
    return this.http.post<User | HttpErrorResponse>(`${this.host}keycloak/user`, user, {observe: 'response'});
  }
  public update(user: UpdateProfile): Observable<User | HttpErrorResponse> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
    });
    return this.http.put<User | HttpErrorResponse>(`${this.host}keycloak/user`, user, {headers: headers});
  }
  public updatePassword(user: UpdatePassword): Observable<User | HttpErrorResponse> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
    });
    return this.http.put<User | HttpErrorResponse>(`${this.host}keycloak/user/password`, user, {headers: headers});
  }
  public logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    localStorage.removeItem('user')
    localStorage.removeItem('refresh_token');
  }

  public isAuthenticated(): boolean {
    this.loadToken();
    console.log(this.token);
    if (this.token !== null && this.token !== ' ' && !this.jwtHelper.isTokenExpired(this.token)) {
      console.log('Token is not expired')
      console.log('Token is not null');
      return true;
    }
    this.logout();
    return false;
  }

  public getToken(): string | null {

    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalStorage(user: User): void {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User | null {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
    this.loggedIn = this.token !== null;
  }

  public saveToken(token: string, refresh: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refresh);
  }


  public getUser(id:string): Observable<HttpResponse<User> | HttpErrorResponse> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
    });

    return this.http.get<HttpResponse<User>>(`${this.host}keycloak/users/${id}`, {headers: headers});
  }
}
