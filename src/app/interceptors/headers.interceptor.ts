import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {


intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authReq = req.clone({
        headers: req.headers.append(
        'Authorization', environment.authorization)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
