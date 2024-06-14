import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { ProductsByIdOrCat } from 'src/app/models/ProductsByIdOrCat.model';
import { Stock } from 'src/app/models/stock.model';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';

@Component({
  selector: 'app-vista-productos',
  templateUrl: './vista-productos.page.html',
  styleUrls: ['./vista-productos.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
  ],
})
export class VistaProductosPage implements OnInit {
  product?: ProductsByIdOrCat;
  stock?: Stock[];
  selectedPrice!: number;
  selectedDescription!: string;
  reference!: string;

  constructor(
    private apiProductsService: ApiProductsService,
    private apiRestFulService: ApiRestFulService
  ) {}

  ngOnInit() {
    this.showProduct('HO-72'); // se establece la referncia del producto que se va a mostrar. 
  }

  /**
   * Busca un producto por su id o referencia y lo muestra en la vista de productos.
   * @param id 
   */
  showProduct(id: number | string) {
    this.apiProductsService
      .productsByIdorReference(id)
      .subscribe((data: any) => {
        this.product = data.resultado;
        this.selectedPrice = data.resultado.precio1;
        this.selectedDescription = data.resultado.descripcionPrecio1;
        this.stockProduct(data.resultado.referencia);
      });
  }

  /**
   * Selecciona el precio y la descripción del producto y lo asigna a las variables selectedPrice y selectedDescription.
   * @param price 
   * @param description 
   */
  selectPrice(price: number, description: string): void {
    this.selectedPrice = price;
    this.selectedDescription = description;
  }

  /**
   * Obtiene el stock del producto por su referencia.
   * @param ref 
   */ 
  stockProduct(ref: string) {
    this.apiProductsService.getStockByReference(ref).subscribe((data: any) => {
      this.stock = data.resultado;
    });
  }
}
