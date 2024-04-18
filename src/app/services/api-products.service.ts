import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  http = inject(HttpClient);
  constructor() {}

  categorias() {
    return this.http.get('https://api.toolsmarketingsas.com/proxy/categorias');
  }

  productsByCategory(id: number) {
    return this.http.get(`https://api.toolsmarketingsas.com/proxy/categorias/${id}/productos/`);
  }
}