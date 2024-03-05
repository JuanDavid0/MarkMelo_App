import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ApiRestFulService } from '../services/api-rest-ful.service';
import { ApiInterceptor, interceptorService } from '../interceptor/api.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ApiRestFulService,
    interceptorService,
  ]
})
export class SharedModule { }
  