import { ApiProductsService } from './../../../services/api-products.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { Categories } from 'src/app/models/Categories.model';
import { Products } from 'src/app/models/Products.model';
import { MainCategoryInformation } from 'src/app/models/MainCategoryInformation.model';

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
  allCategories: Categories[] = [];
  selectedCategoryId!: number;
  selectedSubCategoryId?: number;
  Products: Products[] = [];
  mainCategoryInformation = MainCategoryInformation;

  constructor(private router: Router) {}

  ngOnInit() {
    this.showCurrentUser();
    this.getCategorys();
  }

  prueba() {
    console.log('prueba');
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
    this.ApiProductsService.Categories().subscribe({
      next: (response: any) => {
        this.allCategories = response.resultado;
        console.log('Categorias', this.allCategories);
      },
    });
  }

  showProducts() {
    let categoryIdToUse: number;

    if (this.selectedSubCategoryId !== undefined) {
      categoryIdToUse = this.selectedSubCategoryId;
    } else {
      categoryIdToUse = this.selectedCategoryId;
    }

    this.ApiProductsService.productsByCategory(categoryIdToUse).subscribe({
      next: (response: any) => {
        this.Products = response.resultado;
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
  }
  selectSubCategory(event: any) {
    if (event && event.detail && event.detail.value) {
      this.selectedSubCategoryId = event.detail.value;
    } else {
      this.selectedSubCategoryId = undefined;
    }
  }
}
