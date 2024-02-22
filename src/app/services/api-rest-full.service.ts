import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRestFullService {

  constructor(private http: HttpClient) { }

  getUserApi() {
    return this.http.get(environment.BaseUrl + environment.user,{
      headers:{
        'Authorization': 'c5LTA6WPbMwHhEabYu77nN9cn4VcMj'
      }
    })
  }
}
