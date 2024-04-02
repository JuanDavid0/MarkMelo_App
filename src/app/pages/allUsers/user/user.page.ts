import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { Route, Router, RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
})
export class UserPage implements OnInit {

  
  userData: any;
  ApiRestFulService = inject(ApiRestFulService);
  constructor(private router: Router) { }

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
