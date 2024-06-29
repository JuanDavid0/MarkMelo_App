import { ApiProductManagementService } from './../../services/api-product-management.service';
// src/app/pages/products/products.page.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';
import { ApiProductManagementService } from 'src/app/services/api-product-management.service';
import { Product } from 'src/app/models/product.model';
import { GalleryProductComponent } from './gallery-product/gallery-product.component';


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
    HeaderComponent,
    GalleryProductComponent
  ]
})
export class ProductsPage implements OnInit {
  product: any;
  ApiProductManagement = inject(ApiProductManagementService);

  products: Product[] = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getProductData(id);
  }

  getProductData() {
    this.ApiProductManagement.getProductById(42).subscribe((response: any) => {
      if (response && response.results && response.results.length > 0) {
        this.product = response.results[0];
      }
    });
  }

  getGalleryProducts() {
    this.ApiProductManagement.getGalleryProducts(42).subscribe((data: any) => {
      this.products = data.results.map((result: any) => {
        return {
          ...result,
          gallery_product: JSON.parse(result.gallery_product)
        };
      });
    });
  }


  ngOnInit(): void {
    this.getProductData();
    this.getGalleryProducts();
  }
}
