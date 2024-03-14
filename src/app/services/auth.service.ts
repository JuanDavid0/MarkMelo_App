import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser?: string;
  private isAuhenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);


  constructor() { }

  login(user: { email: string, password: string }):Observable<any> {
    return this.http.post<any>(' https://api.escuelajs.co/api/v1/auth/login', user)
    .pipe(tap((tokens:any) => this.doLoginUser(user.email, tokens.access_token))
    );
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuhenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuhenticatedSubject.next(false);
  }

  getCurrentAuthUser(){
    let token = localStorage.getItem(this.JWT_TOKEN);
    return this.http.get('https://api.escuelajs.co/api/v1/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  isloggedIn(){
    return this.isAuhenticatedSubject.value;
  }



}
