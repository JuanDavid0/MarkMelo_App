import { ApiProductsService } from './../../../services/api-products.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { Categorias } from 'src/app/models/categorias.model';
import { Productos } from 'src/app/models/productos.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
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
export class UserPage implements OnInit {
  ApiProductsService = inject(ApiProductsService);
  ApiRestFulService = inject(ApiRestFulService);

  userData: any;
  allCategories: Categorias[] = [];
  selectedCategoryId!: number;
  selectedSubCategoryId?: number;
  productos: Productos[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(
      'cat' + this.selectedCategoryId + 'subCat' + this.selectedSubCategoryId
    );
    this.showCurrentUser();
    this.getCategorys();
    this.getMainCategory();
  }

  /**
   * Metodo que se encarga de obtener los datos del usuario actual
   */
  showCurrentUser() {
    this.ApiRestFulService.currentUser().subscribe((data: any) => {
      this.userData = data;
    });
  }

  /**
   * Metodo que se encarga de cerrar la sesion del usuario
   */
  logout() {
    this.ApiRestFulService.logout();
  }

  getCategorys() {
    this.ApiProductsService.categorias().subscribe({
      next: (response: any) => {
        this.allCategories = response.resultado;
      },
    });
  }

  getMainCategory() {
    return this.allCategories.filter((category) => category.idParent === null);
  }

  getSubCategory(idParent: any) {
    return this.allCategories.filter(
      (category) => category.idParent === idParent
    );
  }

  selectCategory(event: any) {
    this.selectedCategoryId = event.detail.value;
    console.log('Selected category ID: ', this.selectedCategoryId);
    console.log('Selected Sub Category ID: ', this.selectedSubCategoryId);
  }
  selectSubCategory(event: any) {
    if (event && event.detail && event.detail.value) {
      this.selectedSubCategoryId = event.detail.value;
      console.log('Selected Sub Category ID: ', this.selectedSubCategoryId);
    } else {
      this.selectedSubCategoryId = undefined;
      console.log('No subcategories available');
    }
  }

  showProducts() {
    console.log('Selected category ID:', this.selectedCategoryId);
    console.log('Selected Sub Category ID:', this.selectedSubCategoryId);

    let categoryIdToUse: number;

    if (this.selectedSubCategoryId !== undefined) {
      categoryIdToUse = this.selectedSubCategoryId;
    } else {
      categoryIdToUse = this.selectedCategoryId;
    }

    this.ApiProductsService.productsByCategory(categoryIdToUse).subscribe({
      next: (response: any) => {
        console.log(response);
        this.productos = response.resultado;
      },
    });
  }
}
