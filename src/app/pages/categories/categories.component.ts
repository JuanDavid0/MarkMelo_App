import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';

import { ApiProductManagementService } from './../../services/api-product-management.service';
import { Category } from 'src/app/models/categories';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
  ]
})
export class CategoriesComponent implements OnInit {
  ApiProductManagement = inject(ApiProductManagementService);
  mainCategories: Category[] = [];
  products: Product[] = [];
  showCategories = false;
  idSelected?: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getProductsByCategory(id);
    this.getCategories();
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  getCategories() {
    this.ApiProductManagement.getCategories().subscribe((data) => {
      this.mainCategories = data.results;
    });
  }

  getProductsByCategory(categoryId: string) {
    this.ApiProductManagement.getProductsByCategory(categoryId).subscribe((data) => {
      this.products = data.results;
    });
  }

  setInformationForOneProduct(){
    this.router.navigate(['/products', this.idSelected]);
  }
}
