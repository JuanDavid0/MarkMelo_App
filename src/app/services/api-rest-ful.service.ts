import { IonHeader } from '@ionic/angular/standalone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRestFulService {

  http = inject(HttpClient);

  constructor() { }

  getUsers(){
    return this.http.get(environment.urlApiRestful + environment.users)
  }

  // getUsers(params: any){
  //   return this.http.get(environment.urlApiRestful + environment.users, {params})
  // }
}
