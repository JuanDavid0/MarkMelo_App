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
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiProductManagementService {
  private router = inject(Router);
  http = inject(HttpClient);
  constructor() { }

  getProducts(): Observable<any> {
    return this.http.get(environment.urlApiRestful + environment.products);
  }
  getBanners(): Observable<any> {
    return this.http.get(environment.urlApiRestful + environment.banners);
  }

  getCategories(): Observable<any> {
    return this.http.get(environment.urlApiRestful + environment.categories);
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(environment.urlApiRestful + environment.products+'?linkTo=id_category_product&equalTo=' + categoryId);
  }

  getProductById(productId: String) {
    return this.http.get(environment.urlApiRestful + environment.products+'?linkTo=id_product&equalTo=' + productId);
  }

  getGalleryProducts(productId: string) {
    return this.http.get(environment.urlApiRestful + environment.products+'?linkTo=id_product&equalTo=' + productId + '&select=gallery_product');
  }

  /*updateUserInfo(editar: any) {
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
  }*/
}
