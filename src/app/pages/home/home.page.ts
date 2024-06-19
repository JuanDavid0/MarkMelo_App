import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFacebookGoogleModule } from 'src/app/shared/login-facebook-google.module';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';


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
  ]
})
export class HomePage{
  ApiRestFulService = inject(ApiRestFulService);
  constructor() { }


  

}
