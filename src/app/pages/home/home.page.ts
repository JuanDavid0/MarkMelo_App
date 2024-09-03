import { ApiProductManagementService } from './../../services/api-product-management.service';
import { Observable } from 'rxjs';
import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFacebookGoogleModule } from 'src/app/shared/login-facebook-google.module';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Event, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { BannerComponent } from './banner/banner.component';
import { VistaProductosComponent } from './vista-productos/vista-productos.component';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { Banner } from 'src/app/models/banner.model';
import { Category } from 'src/app/models/categories';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    LoginFacebookGoogleModule,
    GoogleSigninButtonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    BannerComponent,
    VistaProductosComponent,
  ],
})
export class HomePage implements OnInit {
  ApiRestFulService = inject(ApiRestFulService);
  ApiProductManagement = inject(ApiProductManagementService);

  banners: Banner[] = [];
  products: Product[] = [];
  topViewedProducts: Product[] = [];
  mainCategories: Category[] = [];
  userData!: User;
  constructor(private router: Router) {}

  ngOnInit() {
    this.getBanners();
    this.getProducts();
    this.getCategories();
    this.getTopViewedProducts();
  }

  getBanners() {
    this.ApiProductManagement.getBanners().subscribe((data) => {
      this.banners = data.results;
    });
  }

  getProducts() {
    this.ApiProductManagement.getProducts().subscribe((data) => {
      this.products = data.results;
    });
  }

  getTopViewedProducts() {
    this.ApiProductManagement.getProducts().subscribe((data) => {
      this.topViewedProducts = data.results.sort((a: Product, b: Product) => {
        return b.views_product - a.views_product;
      });
    });
  }

  getCategories() {
    this.ApiProductManagement.getCategories().subscribe((data) => {
      this.mainCategories = data.results;
    });
  }
}
