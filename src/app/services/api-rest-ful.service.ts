import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
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


  postLogin(user: any) {
    console.log('User:', user);
    const formData = new FormData();
    formData.append('email_user', user.email_user);
    formData.append('password_user', user.password_user);
    return this.http.post<any>('https://api.uptc.online/users?login=true', formData);
  }
}
