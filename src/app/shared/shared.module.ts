import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiRestFulService } from '../services/api-rest-ful.service';
import { HeadersInterceptor } from '../interceptors/headers.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ApiRestFulService,
    //{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}
  ]
})
export class SharedModule { }
