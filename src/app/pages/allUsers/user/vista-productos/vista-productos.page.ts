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
    console.log('vista Products');
    this.showProduct('HO-72');
  }

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

  selectPrice(price: number, description: string): void {
    this.selectedPrice = price;
    this.selectedDescription = description;
    console.log('Selected price:', price, description);
  }

  stockProduct(ref: string) {
    this.apiProductsService.getStockByReference(ref).subscribe((data: any) => {
      this.stock = data.resultado;
    });
  }
}
