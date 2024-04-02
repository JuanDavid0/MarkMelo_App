import { routes } from './../../../app.routes';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.page.html',
  styleUrls: ['./produccion.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule  ]
})
export class ProduccionPage implements OnInit {
  ApiRestFulService = inject(ApiRestFulService);
  constructor(private router: Router) { }

  ngOnInit() {
    console.log('ProduccionPage');
  }

  logout(){
    this.ApiRestFulService.logout();
  }

}
