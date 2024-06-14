import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  http = inject(HttpClient);
  constructor() {}

  /**
   * Obtiene las categorías de productos.
   * @returns Una solicitud HTTP para obtener las categorías de productos.
   */
  Categories() {
    return this.http.get(environment.urlApiProducts + environment.Categories);
  }

  /**
   * Obtiene los productos por categoría.
   * 
   * @param id - El ID de la categoría.
   * @returns Una solicitud HTTP para obtener los productos de la categoría especificada.
   */
  productsByCategory(id: number) {
    return this.http.get(
      environment.urlApiProducts +
        environment.Categories +
        id +
        environment.Products
    );
  }

  /**
   * Obtiene un producto por su ID o referencia.
   * @param id - El ID o referencia del producto.
   * @returns Una solicitud HTTP que devuelve el producto correspondiente.
   */
  productsByIdorReference(id: number | string) {
    return this.http.get(
      environment.urlApiProducts + environment.Products + id
    );
  }

  /**
   * Obtiene el stock de un producto por su referencia.
   * @param reference La referencia del producto.
   * @returns Una solicitud HTTP que devuelve el stock del producto.
   */
  getStockByReference(reference: string) {
    return this.http.get(
      environment.urlApiProducts + environment.stock + reference
    );
  }
}
