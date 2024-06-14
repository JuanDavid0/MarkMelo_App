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

import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';

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
    FooterComponent,
    HeaderComponent
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

  /**
   * Metodo que se encarga de obtener la informacion del usuario logueado
   */
  showCurrentUser() {
    this.ApiRestFulService.currentUser().subscribe((data: any) => {
      this.userData = data;
    });
  }

  /**
   * Metodo que se encarga de obtener las categorias de los productos
   * para mostrarlos en el select
   */
  getCategorys() {
    this.ApiProductsService.Categories().subscribe({
      next: (response: any) => {
        this.allCategories = response.resultado;
      },
    });
  }
}
