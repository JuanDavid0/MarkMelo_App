import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';

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
export class CategoriesComponent {

  //Temporal mientras se carga el service.
  showCategories = false;
  categories = ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4'];

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
  
}
