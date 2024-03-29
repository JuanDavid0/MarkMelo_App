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

/**
 * Interceptor de la APIRestFul.
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}
  
  /**
   * Intercepta las solicitudes HTTP salientes y agrega el encabezado de autorización.
   * @param request - La solicitud HTTP saliente.
   * @param next - El siguiente controlador de la cadena de interceptores.
   * @returns Un Observable que emite el evento HTTP resultante.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders:{
        'Authorization': environment.authorization,
      }
    });
    return next.handle(request);
  }
}
export const interceptorService = {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
