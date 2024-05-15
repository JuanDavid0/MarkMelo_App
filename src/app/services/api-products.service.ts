import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  http = inject(HttpClient);
  constructor() {}

  Categories() {
    return this.http.get(environment.urlApiProducts + environment.Categories);
  }

  productsByCategory(id: number) {
    return this.http.get(
      environment.urlApiProducts +
        environment.Categories +
        id +
        environment.Products
    );
  }

  productsByIdorReference(id: number | string) {
    return this.http.get(
      environment.urlApiProducts + environment.Products + id
    );
  }

  getStockByReference(reference: string) {
    return this.http.get(
      environment.urlApiProducts + environment.stock + reference
    );
  }
}
