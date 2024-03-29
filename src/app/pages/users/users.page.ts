import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  })
export class UsersPage implements OnInit {

  userData: any;
  ApiRestFulService = inject(ApiRestFulService);
  constructor() { }

  ngOnInit() {
    this.showCurrentUser();
  }

  /**
   * Metodo que se encarga de obtener los datos del usuario actual
   */
  showCurrentUser(){
    this.ApiRestFulService.currentUser().subscribe((data: any) => {
      this.userData = data;
    });
  }

  /**
   * Metodo que se encarga de cerrar la sesion del usuario
   */
  logout(){
    this.ApiRestFulService.logout();
  }

}
