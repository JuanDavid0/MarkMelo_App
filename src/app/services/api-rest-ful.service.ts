import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
/**
 * @description Servicio que se encarga de realizar las peticiones a la API RestFul
 * @class ApiRestFulService
 * @implements {OnInit}
 */

export class ApiRestFulService {

  http = inject(HttpClient);

  constructor() { }
  /**
   * implementacion del metodo que se encarga de obtener los usuarios
   * @returns 
   */
  getUsers(){
    return this.http.get(environment.urlApiRestful + environment.users)
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
      .post<any>('https://api.uptc.online/users?login=true', formData)
      .pipe(
        tap((tokens: any) =>
          this.doLoginUser(
            tokens.results[0].email_user,
            tokens.results[0].token_user
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
        '?select=email_user&linkTo=token_user&equalTo='+
        localStorage.getItem(this.JWT_TOKEN)
    );
  }

  /**
   * Metodo que se encarga de verificar si el token ha expirado o no
   * @returns retorna (false) si el token ha expirado o (true) si no ha expirado
   */
  tokenExpired() {
    const token = localStorage.getItem(this.JWT_TOKEN); // Obtiene el token del localstorage
    if (!token) return false;

    const decodedToken = jwtDecode(token); // Decodifica el token

    if (!decodedToken.exp) return false; // Si no hay fecha de expiración, el token es inválido

    const expirationDate = decodedToken.exp * 1000; // Multiplica la fecha de expiración por 1000 para convertirla en milisegundos
    const dateNow = new Date().getTime(); // Obtiene la fecha actual en milisegundos
    return dateNow < expirationDate; // Retorna si la fecha actual es menor a la fecha de expiración
  }

  register(user: any) { 
    debugger;
    const formData = new FormData();
    formData.append('username_user', user.username_user);
    formData.append('email_user', user.email_user);
    formData.append('password_user', user.password_user);
    return this.http.post<any>('https://api.uptc.online/users?register=true', formData);
  }
}
