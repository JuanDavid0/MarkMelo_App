
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';
import { ApiProductManagementService } from 'src/app/services/api-product-management.service';
import { Product } from 'src/app/models/product.model';
import { GalleryProductComponent } from './gallery-product/gallery-product.component';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';


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
  gallery_products: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  getProductData(id: string) {
    this.ApiProductManagement.getProductById(id).subscribe((response: any) => {
      if (response && response.results && response.results.length > 0) {
        this.product = response.results[0];
      }
    });
  }

  getGalleryProducts(id: string) {
    this.ApiProductManagement.getGalleryProducts(id).subscribe((data: any) => {
      this.gallery_products = data.results.map((result: any) => 
        JSON.parse(result.gallery_product)
      ).flat(); // sirve para aplanar un array de arrays y dejarlo en un solo array
    });
  }

  addToCart(product: any) {
    this.shoppingCartService.addToCart(product);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getProductData(id);
    this.getGalleryProducts(id); 
  }

}
