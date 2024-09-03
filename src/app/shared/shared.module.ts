import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { ApiRestFulService } from '../services/api-rest-ful.service';
import { interceptorService } from '../interceptor/api.interceptor';
import { RouterModule } from '@angular/router';
import { ApiProductManagementService } from '../services/api-product-management.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    ApiRestFulService,
    ApiProductManagementService,
    interceptorService,
  ]
})
export class SharedModule { }
