import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('InterceptorAPI');
    request = request.clone({
      setHeaders:{
        'Authorization': environment.authorization,
      }
    });
    return next.handle(request);
  }
}
export const interceptorService = {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
