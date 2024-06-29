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

  getProductById(productId : string) {
    return this.http.get('https://api.uptc.online/products?linkTo=id_product&equalTo=' + productId);
  }
  getProductById(productId: number) {
    return this.http.get(environment.urlApiRestful + environment.products+'?linkTo=id_product&equalTo=' + productId);
  }

  getGalleryProducts(productId: number) {
    return this.http.get(environment.urlApiRestful + environment.products+'?linkTo=id_product&equalTo=' + productId + '&select=gallery_product');
  }
}
