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
  
}
