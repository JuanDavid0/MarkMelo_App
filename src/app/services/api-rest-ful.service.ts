import { Router, UrlHandlingStrategy} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { getLocaleDateFormat } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class ApiRestFulService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private value: any;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private router = inject(Router);
  public userDetails?: any;

  http = inject(HttpClient);

  constructor() {}
  
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
        catchError((error) => {
          console.error('Error during login:', error);
          throw error;
        }),
        tap((tokens) => {
          if (tokens.results && tokens.results[0].method_user === 'DIRECT') {
            this.doLoginUser(
              tokens.results[0].email_user,
              tokens.results[0].token_user
            );
          } else {
            alert(
              'Login attempted with non-direct method, use: ' +
                tokens.results[0].method_user
            );
          }
        })
      );
  }

  /**
   * Encargado de alamacenar el token del usuario en el localstorage
   * @param email recibe el email del usuario proveniente de la peticion Post (postlogin())
   * @param token  recibe el token del usuario proveniente de la peticion Post (postlogin())
   */
  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);  //
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt); //
  }

  /**
   * Metodo que se encarga de cerrar la sesion del usuario,
   * Elimina el token del usuario del localstorage y redirige a la pagina de login
   */
  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
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
        '?select=*&linkTo=token_user&equalTo=' +
        localStorage.getItem(this.JWT_TOKEN)
    );
  }

  /**
   * Obtiene el ID de usuario.
   * @returns Un Observable que emite una cadena de texto que representa el ID de usuario.
   */
  get_id_User(): Observable<string> {
    return this.http.get<any>(
      environment.urlApiRestful +
        environment.users +
        '?select=id_user&linkTo=token_user&equalTo=' +
        localStorage.getItem(this.JWT_TOKEN)
    ).pipe(
      map((response: any) => {
        if (response.results && response.results.length > 0) {
          return response.results[0].id_user;
        } else {
          throw new Error('No se pudo obtener el id_user.');
        }
      })
    );
  }


  /**
   * Comprueba si el token de autenticación ha expirado.
   * 
   * @returns {boolean} `true` si el token ha expirado, `false` en caso contrario.
   */
  isTokenExpired(): boolean {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (!token) return true;

    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) return true;

    const expirationDate = decodedToken.exp * 1000;
    const dateNow = new Date().getTime();
    const dateformat = new Date(dateNow);
    return dateNow > expirationDate;
  }

  /**
   * Registra un usuario en el sistema.
   * 
   * @param user - Los datos del usuario a registrar.
   * @returns Un observable booleano que indica si el registro fue exitoso.
   * @throws Un error si el correo electrónico ya está registrado o si ocurre un error durante el registro.
   */
  register(user: any): Observable<boolean> {
    return this.isExistingEmail(user.email_user).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          // El correo electrónico no existe, procedemos con el registro
          const formData = new FormData();
          formData.append('username_user', user.username_user);
          formData.append('email_user', user.email_user);
          formData.append('phone_user', user.phone_user);
          formData.append('password_user', user.password_user);
          formData.append('method_user', 'DIRECT');
          formData.append('rol_user', 'DEFAULT');
          formData.append('date_created_user', new Date().toISOString());
          alert('Registro exitoso.');
          return this.http.post<any>(
            environment.urlApiRestful + environment.users,
            formData
          );
        } else {
          alert('El correo electrónico ya está registrado.');
          return throwError('El correo electrónico ya está registrado.');
        }
      }),
      catchError((error: any) => {
        console.error('Error durante el registro:', error);
        return throwError('Ocurrió un error durante el registro.');
      })
    );
  }

  /**
   * Metodo que se encarga de verificar si el email ya esta registrado en la base de datos
   * @param email
   * @returns retorna (true) si el email ya esta registrado o (false) si no esta registrado
   */
  isExistingEmail(email: string): Observable<boolean> {
    // Eliminar espacios en blanco alrededor del email
    const trimmedEmail = email.trim();
    return this.http
      .get(
        environment.urlApiRestful + '/users?select=email_user&linkTo=email_user&equalTo=' +
          trimmedEmail
      )
      .pipe(
        map((response: any) => {
          if (response.results[0].email_user === trimmedEmail) {
            return true;
          } else {
            return false;
          }
        }),
        catchError((error: any) => {
          console.error('Error verificando email:', error);
          return of(false); // Devuelve falso en caso de error
        })
      );
  }

  /**
   * Metodo que se encarga de registrar un usuario con Google
   * @param user
   * @returns retorna el usuario registrado
   */
  registerGoogleSocial(user: any): Observable<any> {
    return this.isExistingEmail(user.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          const googleFormData = new FormData();
          googleFormData.append('username_user', user.name);
          googleFormData.append('email_user', user.email);
          googleFormData.append('picture_user', user.photoUrl);
          googleFormData.append('method_user', user.provider);
          return this.http
            .post<any>(
              environment.urlApiRestful + environment.register,
              googleFormData
            )
            .pipe(
              tap((tokens: any) =>
                this.doLoginUser(
                  tokens.results[0].email_user,
                  tokens.results[0].token_user
                )
              )
            );
        } else {
          return this.postGoogleLogin(user);
        }
      }),
      catchError((error: any) => {
        console.error(
          'Error registrando o iniciando sesión con Google:',
          error
        );
        return throwError(
          'Ocurrió un error durante el registro o inicio de sesión con Google.'
        );
      })
    );
  }

  /**
   *  Metodo que se encarga de iniciar sesion con Google
   * @param user
   * @returns retorna el usuario logueado
   */
  postGoogleLogin(user: any): Observable<any> {
    const googleFormData = new FormData();
    googleFormData.append('email_user', user.email);

    return this.http
      .post<any>(environment.urlApiRestful + environment.login, googleFormData)
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
   * Metodo que se encarga de registrar un usuario con Facebook
   * @param user
   * @returns retorna el usuario registrado
   */
  registerFacebookSocial(user: any): Observable<any> {
    return this.isExistingEmail(user.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          const facebookFormData = new FormData();
          facebookFormData.append('username_user', user.name);
          facebookFormData.append('email_user', user.email);
          facebookFormData.append(
            'picture_user',
            user.response.picture.data.url
          );
          facebookFormData.append('method_user', user.provider);
          return this.http
            .post<any>(
              environment.urlApiRestful + environment.register,
              facebookFormData
            )
            .pipe(
              tap((tokens: any) =>
                this.doLoginUser(
                  tokens.results[0].email_user,
                  tokens.results[0].token_user
                )
              )
            );
        } else {
          return this.postFacebookLogin(user);
        }
      }),
      catchError((error: any) => {
        console.error(
          'Error registrando o iniciando sesión con Facebook:',
          error
        );
        return throwError(
          'Ocurrió un error durante el registro o inicio de sesión con Facebook.'
        );
      })
    );
  }


  /**
   * Realiza una solicitud de inicio de sesión utilizando la cuenta de Facebook del usuario.
   * 
   * @param user - Los datos del usuario de Facebook.
   * @returns Un observable que emite la respuesta de la solicitud de inicio de sesión.
   */
  postFacebookLogin(user: any): Observable<any> {
    const facebookFormData = new FormData();
    facebookFormData.append('email_user', user.email);
    return this.http
      .post<any>(environment.urlApiRestful + environment.login, facebookFormData)
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
   * Metodo que se encarga de obtener los datos del usuario actual (Para este caso se retorna el rol de usuario)
   * @returns retorna los datos del usuario actual
   */
  getRol(): Observable<any> {
    return this.http.get<any>(`${environment.urlApiRestful}${environment.users}?select=rol_user&linkTo=token_user&equalTo=${localStorage.getItem(this.JWT_TOKEN)}`);
  }

  /**
   * Actualiza la información del usuario en base a los datos proporcionados en el formulario.
   * @param editar - Los datos del formulario a actualizar.
   */
  updateUserInfo(editar: any) {
    const controls = editar.controls;
    let queryString = '';
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control.status === 'VALID') queryString += key + '=' + control.value + '&';
    });
    const token = localStorage.getItem(this.JWT_TOKEN) || '';
    this.get_id_User().subscribe((userId: string) => {
      this.http.put(environment.urlApiRestful + '/users?id=' + userId + '&nameId=id_user&token=' + token + '&table=users&suffix=user',
      queryString, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }).subscribe((response: any) => {
        console.log('Response:', response);
      });
    });
  }
}