import { SharedModule } from './../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class ApiRestFulService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private value: any;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);

  public userDetails?: any;

  http = inject(HttpClient);

  constructor() { }

  /**
   * implementacion del metodo que se encarga de obtener los usuarios
   * @returns
   */
  getUsers() {
    return this.http.get('https://api.toolsmarketingsas.com/proxy/categorias');
  }

  /**
   * Metodo que se encarga de obtener los datos del usuario actual
   * @returns retorna los datos del usuario actual
   */
  postlogin(user: any): Observable<any> {
    const formData = new FormData();
    formData.append('email_user', user.email_user);
    formData.append('password_user', user.password_user);

    return this.http
      .post<any>(environment.urlApiRestful + environment.login, formData)
      .pipe(
        tap((tokens: any) =>
          this.doLoginUser(
            tokens.results[0].email_user,
            'tokens.results[0].token_user'
          )
        )
      );
  }

  /**
   * Encargado de alamacenar el token del usuario en el localstorage
   * @param email recibe el email del usuario proveniente de la peticion Post (postlogin())
   * @param token  recibe el token del usuario proveniente de la peticion Post (postlogin())
   */
  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  /**
   * Metodo que se encarga de cerrar la sesion del usuario,
   * Elimina el token del usuario del localstorage y redirige a la pagina de login
   */
  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * checkea si hay un token en el localstorage
   * @returns retorna si el usuario esta logueado o no
   */
  isloggedIn() {
    return localStorage.getItem(this.JWT_TOKEN) !== null;
  }

  /**
   * Metodo que se encarga de obtener los datos del usuario actual
   * @returns retorna los datos del usuario actual
   */
  currentUser() {
    return this.http.get(
      environment.urlApiRestful +
      environment.users +
      '?select=email_user&linkTo=token_user&equalTo=' +
      localStorage.getItem(this.JWT_TOKEN)
    );
  }

  /**
   * Metodo que se encarga de verificar si el token ha expirado o no
   * @returns retorna (false) si el token ha expirado(o no existe) o (true) si no ha expirado
   */
  tokenExpired() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (!token) return false;

    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) return false;

    const expirationDate = decodedToken.exp * 1000;
    const dateNow = new Date().getTime();
    const dateformat = new Date(dateNow);
    return dateNow < expirationDate;
  }

  register(user: any) {
    const formData = new FormData();
    formData.append('username_user', user.username_user);
    formData.append('email_user', user.email_user);
    formData.append('password_user', user.password_user);
    return this.http.post<any>('https://api.uptc.online/users?register=true', formData);
  }

  registerGoogleSocial(user: any) {
    const googleFormData = new FormData();
    googleFormData.append('username_user', user.name);
    googleFormData.append('email_user', user.email);
    googleFormData.append('picture_user', user.photoUrl);
    googleFormData.append('token_user', user.idToken);
    this.postGoogleLogin(user);
    return this.http.post<any>('https://api.uptc.online/users?register=true', googleFormData);
  }

  postGoogleLogin(user: any): Observable<any> {
    const googleFormData = new FormData();
    googleFormData.append('email_user', user.email);
    googleFormData.append('token_user', user.idToken);
    return this.http.post<any>('https://api.uptc.online/users?login=true', googleFormData).pipe(
      tap((tokens: any) =>
        this.doLoginUser(
          tokens.results[0].email_user,
          tokens.results[0].token_user
        )
      )
    );
  }

  registerFacebookSocial(user: any) {
    const facebookFormData = new FormData();
    facebookFormData.append('username_user', user.name);
    facebookFormData.append('email_user', user.email);
    facebookFormData.append('picture_user', user.picture_user);
    facebookFormData.append('token_user', user.authToken);
    this.postFacebookLogin(user);
    return this.http.post<any>('https://api.uptc.online/users?register=true', facebookFormData);
  }

  postFacebookLogin(user: any): Observable<any> {
    const facebookFormData = new FormData();
    facebookFormData.append('email_user', user.email);
    facebookFormData.append('token_user', user.authToken);
    return this.http.post<any>('https://api.uptc.online/users?login=true', facebookFormData).pipe(
      tap((tokens: any) =>
        this.doLoginUser(
          tokens.results[0].email_user,
          tokens.results[0].token_user
        )
      )
    );
  }

  getRol() {
    const rol = 'user'
    console.log('prueba');
    return rol;
  }
}