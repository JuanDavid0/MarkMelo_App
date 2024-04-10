import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ApiRestFulService } from '../services/api-rest-ful.service';
import { ApiInterceptor, interceptorService } from '../interceptor/api.interceptor';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    ApiRestFulService,
    interceptorService,
  ]
})
export class SharedModule { }
