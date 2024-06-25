// src/app/pages/products/products.page.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent
  ],
})
export class ProductsPage implements OnInit {

  apiService = inject(ApiRestFulService); 
  product: any;

  constructor() { }

  getProductData(){
    this.apiService.getProductById(42).subscribe((response: any) => {
      if (response && response.results && response.results.length > 0) {
        this.product = response.results[0];
        this.product.gallery_product = JSON.parse(this.product.gallery_product);
      }
    });
  }

  ngOnInit(): void {
    this.getProductData();
  }
}
