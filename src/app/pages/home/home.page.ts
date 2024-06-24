import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFacebookGoogleModule } from 'src/app/shared/login-facebook-google.module';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Event, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { BannerComponent } from './banner/banner.component';
import { VistaProductosComponent } from './vista-productos/vista-productos.component';
import { User } from 'src/app/models/user.model';

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
  
  slides: any[] = [];
  products: any[] = [];
  userData: User | undefined;
  constructor() {}

  ngOnInit() {
    console.log('HomePage');
    this.slides = [
      { banner: 'assets/img/1.jpg' },
      { banner: 'assets/img/2.jpg' },
      { banner: 'assets/img/3.jpg' },
      { banner: 'assets/img/4.jpg' },
      { banner: 'assets/img/1_1.jpg' },
      { banner: 'assets/img/2_1.jpg' },
      { banner: 'assets/img/3_1.jpg' },
      { banner: 'assets/img/1_2.jpg' },
      { banner: 'assets/img/2_2.jpg' },
      { banner: 'assets/img/4_4.jpg' },
      { banner: 'assets/img/3_3.jpg' },
      { banner: 'assets/img/4_1.jpg' },
    ];
    this.products = [
      { banner: 'assets/img/1.jpg' },
      { banner: 'assets/img/2.jpg' },
      { banner: 'assets/img/3.jpg' },
      { banner: 'assets/img/4.jpg' },
      { banner: 'assets/img/1_1.jpg' },
      { banner: 'assets/img/2_1.jpg' },
      { banner: 'assets/img/3_1.jpg' },
      { banner: 'assets/img/1_2.jpg' },
      { banner: 'assets/img/2_2.jpg' },
      { banner: 'assets/img/4_4.jpg' },
      { banner: 'assets/img/3_3.jpg' },
      { banner: 'assets/img/4_1.jpg' },
    ];
    this.showCurrentUser();
  }

  showCurrentUser() {
    if (this.ApiRestFulService.isloggedIn()) {
      this.ApiRestFulService.currentUser().subscribe((user: any) => {
        console.log(user.results[0]);
        this.userData = user.results[0];
      });
    }
  }
}
